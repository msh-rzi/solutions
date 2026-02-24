import Link from 'next/link';

type HeaderBrandProps = {
  brand: string;
  brandMark: string;
  tagline: string;
};

export function HeaderBrand({ brand, brandMark, tagline }: HeaderBrandProps) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground shadow-ambient transition-transform group-hover:-translate-y-0.5">
        {brandMark}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-foreground">{brand}</p>
        <p className="text-xs text-muted-foreground">{tagline}</p>
      </div>
    </Link>
  );
}
