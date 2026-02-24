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
    title: 'Industry-Specific',
    items: [
      'Enterprise operations workflows',
      'Travel distribution and reservation platform logic',
      'Microservices architecture and service boundaries',
      'Concurrency-safe transaction handling',
      'Idempotent booking and payment flows',
      'Field-level access control',
      'Multi-tenant dashboard patterns',
      'Pricing inventory and availability synchronization',
      'Audit trails and compliance-ready event logging',
      'Operational reporting pipelines',
    ],
  },
  {
    title: 'Tooling & Infrastructure',
    items: ['Docker', 'Turborepo', 'Nx', 'Git'],
  },
];
