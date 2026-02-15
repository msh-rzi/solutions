import Link from 'next/link';
import type { HeaderNavItem } from './types';

type HeaderMobileNavProps = {
  items: readonly HeaderNavItem[];
  isOpen: boolean;
  onItemClick: () => void;
};

export function HeaderMobileNav({ items, isOpen, onItemClick }: HeaderMobileNavProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <ul className="mt-4 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-ambient lg:hidden">
      {items.map((item) => (
        <li key={item.href} className="py-2">
          <Link
            href={item.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={onItemClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
