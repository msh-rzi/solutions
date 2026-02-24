type HeroSnapshotProps = {
  items: readonly string[];
  title: string;
};

export function HeroSnapshot({ items, title }: HeroSnapshotProps) {
  return (
    <aside className="animate-in fade-in slide-in-from-bottom-6 delay-150 duration-700">
      <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-ambient backdrop-blur">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
        <ul className="mt-6 space-y-4 text-sm text-foreground">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
