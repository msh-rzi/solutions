import type { SkillGroup } from './types';

export const skillsCatalog: SkillGroup[] = [
  {
    title: 'Backend & Data Integrity',
    items: ['TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma ORM', 'Drizzle ORM', 'ACID transaction design', 'Idempotent API patterns'],
  },
  {
    title: 'Operator-Facing Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'TanStack Table',
      'TanStack Form',
      'Zustand',
      'Tailwind CSS',
      'shadcn/ui',
      'Mantine UI',
      'Responsive UI architecture',
      'Frontend performance tuning',
      'Field-level authorization UX',
    ],
  },
  {
    title: 'System Design Domains',
    items: [
      'ERP, OTA, CRS, and ticketing workflows',
      'Reservation and inventory consistency models',
      'Financial ledger and auditability architecture',
      'Multi-tenant access boundaries',
      'Pricing, availability, and synchronization rules',
      'Operational reporting and observability contracts',
    ],
  },
  {
    title: 'Delivery Tooling',
    items: ['Docker', 'Turborepo', 'Nx', 'Git', 'Testing strategy', 'Architecture decision records'],
  },
];
