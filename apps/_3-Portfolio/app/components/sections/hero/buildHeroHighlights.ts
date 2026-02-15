import { Gauge, Layers3, ShieldCheck } from 'lucide-react';
import type { HeroHighlightItem } from './types';

export function buildHeroHighlights(highlights: readonly string[]): HeroHighlightItem[] {
  return [
    { icon: ShieldCheck, text: highlights[0] ?? '' },
    { icon: Layers3, text: highlights[1] ?? '' },
    { icon: Gauge, text: highlights[2] ?? '' },
  ].filter((item) => item.text.length > 0);
}
