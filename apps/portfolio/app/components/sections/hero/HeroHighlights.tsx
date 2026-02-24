import type { HeroHighlightItem } from './types';

type HeroHighlightsProps = {
  items: readonly HeroHighlightItem[];
  label: string;
};

export function HeroHighlights({ items, label }: HeroHighlightsProps) {
  return (
    <div className="mt-12">
      <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.text} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm">
            <item.icon size={18} className="mt-1 text-primary" />
            <p className="text-sm text-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
