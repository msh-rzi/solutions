'use client';

import * as React from 'react';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui-shadcn';
import type { DashboardAccent, DashboardDensity, DashboardLayoutPreset, DashboardPreferences, DashboardSurface } from './useDashboardPreferences';

interface DashboardLayoutPickerProps {
  preferences: DashboardPreferences;
  onChange: <K extends keyof DashboardPreferences>(key: K, value: DashboardPreferences[K]) => void;
  onReset: () => void;
}

type LayoutOption = { value: DashboardLayoutPreset; label: string };
type DensityOption = { value: DashboardDensity; label: string };
type SurfaceOption = { value: DashboardSurface; label: string };
type AccentOption = { value: DashboardAccent; label: string };

const layoutOptions: readonly LayoutOption[] = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'analytics', label: 'Analytics-first' },
  { value: 'operations', label: 'Operations-first' },
];

const densityOptions: readonly DensityOption[] = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

const surfaceOptions: readonly SurfaceOption[] = [
  { value: 'elevated', label: 'Elevated' },
  { value: 'flat', label: 'Flat' },
  { value: 'glass', label: 'Glass' },
];

const accentOptions: readonly AccentOption[] = [
  { value: 'slate', label: 'Slate' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'blue', label: 'Blue' },
  { value: 'amber', label: 'Amber' },
];

export function LayoutPicker({ preferences, onChange, onReset }: DashboardLayoutPickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-2">
      <div className="grid gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Layout</span>
        <Select value={preferences.layout} onValueChange={(value) => onChange('layout', value as DashboardLayoutPreset)}>
          <SelectTrigger size="sm" className="w-35 bg-background">
            <SelectValue placeholder="Layout" />
          </SelectTrigger>
          <SelectContent>
            {layoutOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Density</span>
        <Select value={preferences.density} onValueChange={(value) => onChange('density', value as DashboardDensity)}>
          <SelectTrigger size="sm" className="w-32.5 bg-background">
            <SelectValue placeholder="Density" />
          </SelectTrigger>
          <SelectContent>
            {densityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Surface</span>
        <Select value={preferences.surface} onValueChange={(value) => onChange('surface', value as DashboardSurface)}>
          <SelectTrigger size="sm" className="w-30 bg-background">
            <SelectValue placeholder="Surface" />
          </SelectTrigger>
          <SelectContent>
            {surfaceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Accent</span>
        <Select value={preferences.accent} onValueChange={(value) => onChange('accent', value as DashboardAccent)}>
          <SelectTrigger size="sm" className="w-28 bg-background">
            <SelectValue placeholder="Accent" />
          </SelectTrigger>
          <SelectContent>
            {accentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" size="sm" className="self-end" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}

