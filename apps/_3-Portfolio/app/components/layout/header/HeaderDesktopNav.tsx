import Link from 'next/link';
import type { HeaderNavItem } from './types';

type HeaderDesktopNavProps = {
  items: readonly HeaderNavItem[];
};

export function HeaderDesktopNav({ items }: HeaderDesktopNavProps) {
  return (
    <ul className="hidden items-center gap-8 lg:flex">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
