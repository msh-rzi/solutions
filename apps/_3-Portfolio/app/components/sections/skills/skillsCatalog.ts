import type { SkillGroup } from './types';

export const skillsCatalog: SkillGroup[] = [
  {
    title: 'Backend & Core',
    items: ['TypeScript', 'Node.js', 'NestJS', 'Express.js', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma ORM', 'Drizzle ORM'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Mantine UI', 'Material UI'],
  },
  {
    title: 'Tooling & Infrastructure',
    items: ['Docker', 'Turborepo', 'Nx', 'Git'],
  },
];
