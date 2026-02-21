import { promises as fs } from 'node:fs';
import path from 'node:path';

type PackageManifest = {
  name?: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type ProjectOverride = {
  title: string;
  description: string;
  category?: string;
  stack?: string[];
  order?: number;
  appUrl?: string;
};

export type WorkspaceProject = {
  id: string;
  packageName: string;
  title: string;
  description: string;
  category: string;
  path: string;
  stack: string[];
  appUrl?: string;
};

type ProjectRecord = WorkspaceProject & {
  order: number;
  categoryPriority: number;
};

const SKIPPED_DIRECTORIES = new Set(['node_modules', 'dist', '.next', '.turbo']);
const SKIPPED_PACKAGES = new Set(['portfolio']);

const CATEGORY_PRIORITY = {
  Backend: 1,
  Frontend: 2,
  Portfolio: 3,
  SASS: 4,
  Other: 9,
} as const;

const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  'acid-transaction-system': {
    title: 'ACID Transaction System',
    description:
      'Financial ledger core with double-entry validation, row-level locking, overdraft protection, and immutable audit logs.',
    category: 'Backend',
    stack: ['NestJS', 'Drizzle ORM', 'PostgreSQL', 'TypeScript'],
    order: 1,
  },
  'query-optimization': {
    title: 'Query Optimization Lab',
    description:
      'N+1 performance lab comparing naive access, Prisma relation loading, and SQL left joins with per-request query metrics.',
    category: 'Backend',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'TypeScript'],
    order: 2,
  },
  dashboard: {
    title: 'Multi-Tenant Dashboard',
    description:
      'Tenant-aware operations dashboard with role-focused views for analytics, users, and notifications plus in-app org switching.',
    category: 'Frontend',
    stack: ['Next.js', 'React', 'better-auth', 'shadcn/ui'],
    order: 3,
  },
  'data-grid': {
    title: 'High-Volume Data Grid',
    description:
      'React data-grid prototype for large datasets with virtualization, filtering, sorting, and master-detail expansion.',
    category: 'Frontend',
    stack: ['React', 'Vite', 'TanStack Table', 'Zustand'],
    order: 4,
  },
  'field-level-permission-filters': {
    title: 'Field-Level Permission Filters',
    description:
      'Schema-driven form engine with RBAC field visibility/editability, server-side filtering, and role-aware submission feedback.',
    category: 'Frontend',
    stack: ['Next.js', 'React', 'TanStack Form', 'Zod'],
    order: 5,
  },
};

type AppLinkConfig = {
  portEnvName: string;
  defaultPort: number;
  path?: string;
};

const PROJECT_LINKS: Record<string, AppLinkConfig> = {
  'field-level-permission-filters': {
    portEnvName: 'PORT_FIELD_LEVEL_PERMISSION_FILTERS',
    defaultPort: 3011,
  },
  'data-grid': { portEnvName: 'PORT_DATA_GRID', defaultPort: 3012 },
  dashboard: { portEnvName: 'PORT_DASHBOARD', defaultPort: 3013 },
  'acid-transaction-system': {
    portEnvName: 'PORT_ACID_TRANSACTION_SYSTEM',
    defaultPort: 3020,
    path: '/docs',
  },
  'query-optimization': {
    portEnvName: 'PORT_QUERY_OPTIMIZATION',
    defaultPort: 3021,
    path: '/docs',
  },
};

const TECH_STACK_LABELS: Record<string, string> = {
  '@nestjs/core': 'NestJS',
  '@prisma/client': 'Prisma',
  'drizzle-orm': 'Drizzle ORM',
  next: 'Next.js',
  react: 'React',
  '@tanstack/react-table': 'TanStack Table',
  '@tanstack/react-virtual': 'TanStack Virtual',
  '@tanstack/react-form': 'TanStack Form',
  'better-auth': 'better-auth',
  zod: 'Zod',
  zustand: 'Zustand',
  pg: 'PostgreSQL',
  typescript: 'TypeScript',
  vite: 'Vite',
};

const TECH_STACK_PRIORITY = [
  '@nestjs/core',
  '@prisma/client',
  'drizzle-orm',
  'pg',
  'next',
  'react',
  'better-auth',
  '@tanstack/react-form',
  '@tanstack/react-table',
  '@tanstack/react-virtual',
  'zustand',
  'zod',
  'vite',
  'typescript',
] as const;

function toPosixPath(value: string): string {
  return value.split(path.sep).join('/');
}

function toTitle(value: string): string {
  return value
    .replace(/^_\d+-/, '')
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readJsonFile<T>(targetPath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(targetPath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function resolveWorkspaceRoot(): Promise<string> {
  const candidates = [
    process.cwd(),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
    path.resolve(process.cwd(), '../../..'),
  ];

  for (const candidate of candidates) {
    const appsPath = path.join(candidate, 'apps');
    try {
      const stat = await fs.stat(appsPath);
      if (stat.isDirectory()) {
        return candidate;
      }
    } catch {
      continue;
    }
  }

  return process.cwd();
}

function inferCategory(categoryDirectoryName: string): string {
  const normalized = categoryDirectoryName.toLowerCase();

  if (normalized.includes('backend')) {
    return 'Backend';
  }

  if (normalized.includes('frontend')) {
    return 'Frontend';
  }

  if (normalized.includes('portfolio')) {
    return 'Portfolio';
  }

  if (normalized.includes('sass')) {
    return 'SASS';
  }

  const title = toTitle(categoryDirectoryName);
  return title || 'Other';
}

function inferTechStack(manifest: PackageManifest, overrideStack: string[]): string[] {
  const deps = {
    ...(manifest.dependencies ?? {}),
    ...(manifest.devDependencies ?? {}),
  };

  const inferred = TECH_STACK_PRIORITY
    .filter((dependencyName) => Object.hasOwn(deps, dependencyName))
    .map((dependencyName) => TECH_STACK_LABELS[dependencyName])
    .filter((entry): entry is string => Boolean(entry));

  return Array.from(new Set([...overrideStack, ...inferred])).slice(0, 6);
}

function resolveCategoryPriority(category: string): number {
  if (Object.hasOwn(CATEGORY_PRIORITY, category)) {
    return CATEGORY_PRIORITY[category as keyof typeof CATEGORY_PRIORITY];
  }

  return CATEGORY_PRIORITY.Other;
}

function resolveProjectUrl(packageName: string): string | undefined {
  const linkConfig = PROJECT_LINKS[packageName];
  if (!linkConfig) {
    return undefined;
  }

  const parsedPort = Number.parseInt(
    process.env[linkConfig.portEnvName] ?? '',
    10,
  );
  const port = Number.isNaN(parsedPort) ? linkConfig.defaultPort : parsedPort;
  const protocol = process.env.APP_LINK_PROTOCOL ?? 'http';
  const host = process.env.APP_LINK_HOST ?? 'localhost';
  const pathSuffix = linkConfig.path ?? '';

  return `${protocol}://${host}:${port}${pathSuffix}`;
}

async function readProjectFromDirectory(
  workspaceRoot: string,
  categoryDirectoryName: string,
  projectDirectoryPath: string,
): Promise<ProjectRecord | null> {
  const manifestPath = path.join(projectDirectoryPath, 'package.json');
  const manifest = await readJsonFile<PackageManifest>(manifestPath);

  if (!manifest?.name || SKIPPED_PACKAGES.has(manifest.name)) {
    return null;
  }

  const override = PROJECT_OVERRIDES[manifest.name];
  const category = override?.category ?? inferCategory(categoryDirectoryName);
  const stack = inferTechStack(manifest, override?.stack ?? []);
  const categoryPriority = resolveCategoryPriority(category);
  const fallbackDescription = manifest.description?.trim() || 'Repository project synced from workspace metadata.';

  return {
    id: manifest.name,
    packageName: manifest.name,
    title: override?.title ?? toTitle(path.basename(projectDirectoryPath)),
    description: override?.description ?? fallbackDescription,
    category,
    path: toPosixPath(path.relative(workspaceRoot, projectDirectoryPath)),
    stack,
    appUrl: override?.appUrl ?? resolveProjectUrl(manifest.name),
    order: override?.order ?? 99,
    categoryPriority,
  };
}

export async function getWorkspaceProjects(): Promise<WorkspaceProject[]> {
  try {
    const workspaceRoot = await resolveWorkspaceRoot();
    const appsRoot = path.join(workspaceRoot, 'apps');
    const categoryEntries = await fs.readdir(appsRoot, { withFileTypes: true });
    const projects: ProjectRecord[] = [];

    for (const categoryEntry of categoryEntries) {
      if (!categoryEntry.isDirectory() || categoryEntry.name.startsWith('.')) {
        continue;
      }

      const categoryPath = path.join(appsRoot, categoryEntry.name);
      const rootManifestPath = path.join(categoryPath, 'package.json');

      if (await pathExists(rootManifestPath)) {
        const rootProject = await readProjectFromDirectory(
          workspaceRoot,
          categoryEntry.name,
          categoryPath,
        );
        if (rootProject) {
          projects.push(rootProject);
        }
      }

      const childEntries = await fs.readdir(categoryPath, { withFileTypes: true });
      for (const childEntry of childEntries) {
        if (
          !childEntry.isDirectory() ||
          childEntry.name.startsWith('.') ||
          SKIPPED_DIRECTORIES.has(childEntry.name)
        ) {
          continue;
        }

        const childProjectPath = path.join(categoryPath, childEntry.name);
        const manifestPath = path.join(childProjectPath, 'package.json');
        if (!(await pathExists(manifestPath))) {
          continue;
        }

        const nestedProject = await readProjectFromDirectory(
          workspaceRoot,
          categoryEntry.name,
          childProjectPath,
        );
        if (nestedProject) {
          projects.push(nestedProject);
        }
      }
    }

    return projects
      .sort((left, right) => {
        return (
          left.order - right.order ||
          left.categoryPriority - right.categoryPriority ||
          left.title.localeCompare(right.title)
        );
      })
      .map((project) => ({
        id: project.id,
        packageName: project.packageName,
        title: project.title,
        description: project.description,
        category: project.category,
        path: project.path,
        stack: project.stack,
        appUrl: project.appUrl,
      }));
  } catch {
    return [];
  }
}
