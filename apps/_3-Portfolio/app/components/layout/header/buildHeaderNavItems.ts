import type { PortfolioDictionary } from '@repo/i18n/portfolio';
import type { HeaderNavItem } from './types';

export function buildHeaderNavItems(t: PortfolioDictionary): HeaderNavItem[] {
  return [
    { href: '/', label: t.nav.home },
    { href: '/#about', label: t.nav.about },
    { href: '/#skills', label: t.nav.skills },
    { href: '/expertise', label: t.nav.expertise },
    { href: '/#contact', label: t.nav.contact },
  ];
}
