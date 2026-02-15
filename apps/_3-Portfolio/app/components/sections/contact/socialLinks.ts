import { Github, Linkedin, Mail } from 'lucide-react';
import type { ContactLink } from './types';

export const socialLinks: ContactLink[] = [
  {
    href: 'mailto:its.mehdirezaei@gmail.com',
    icon: Mail,
    label: 'its.mehdirezaei@gmail.com',
    name: 'Email',
  },
  {
    external: true,
    href: 'https://github.com/msh-rzi',
    icon: Github,
    label: 'github.com/msh-rzi',
    name: 'GitHub',
  },
  {
    external: true,
    href: 'https://www.linkedin.com/in/imehd-i79/',
    icon: Linkedin,
    label: 'linkedin.com/in/imehd-i79/',
    name: 'LinkedIn',
  },
];
