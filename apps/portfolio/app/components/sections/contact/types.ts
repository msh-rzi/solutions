import type { LucideIcon } from 'lucide-react';

export type ContactLink = {
  external?: boolean;
  href: string;
  icon: LucideIcon;
  label: string;
  name: string;
};
