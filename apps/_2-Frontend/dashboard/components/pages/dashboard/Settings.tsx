'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, Checkbox, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Label, ScrollArea, Separator, Skeleton, ToggleTheme } from '@repo/ui-shadcn';

type SettingsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type LayoutPreset = 'executive' | 'operations' | 'analyst';

type ChartColorScheme = 'default' | 'ocean' | 'sunset' | 'forest' | 'rose' | 'mono';

type DashboardPreferences = {
  layout: LayoutPreset;
  liveRefresh: boolean;
  compactDensity: boolean;
  requireBulkActionConfirmation: boolean;
  maskSensitiveValues: boolean;
  anomalySignals: boolean;
  weeklyDigest: boolean;
  chartColorScheme: ChartColorScheme;
};

const SETTINGS_STORAGE_KEY = 'dashboard.preferences.v1';
const PREFERENCES_UPDATED_EVENT = 'dashboard:preferences-updated';

const DEFAULT_PREFERENCES: DashboardPreferences = {
  layout: 'executive',
  liveRefresh: true,
  compactDensity: false,
  requireBulkActionConfirmation: true,
  maskSensitiveValues: true,
  anomalySignals: true,
  weeklyDigest: false,
  chartColorScheme: 'default',
};

const CHART_COLOR_SCHEMES: { value: ChartColorScheme; label: string; from: string; to: string }[] = [
  { value: 'default', label: 'Default', from: '#6366f1', to: '#8b5cf6' },
  { value: 'ocean', label: 'Ocean', from: '#0ea5e9', to: '#06b6d4' },
  { value: 'sunset', label: 'Sunset', from: '#f97316', to: '#ef4444' },
  { value: 'forest', label: 'Forest', from: '#22c55e', to: '#84cc16' },
  { value: 'rose', label: 'Rose', from: '#f43f5e', to: '#fb923c' },
  { value: 'mono', label: 'Mono', from: '#94a3b8', to: '#1e293b' },
];

const LAYOUT_OPTIONS: { value: LayoutPreset; title: string; description: string }[] = [
  {
    value: 'executive',
    title: 'Executive',
    description: 'KPI-first overview with fast status scanning.',
  },
  {
    value: 'operations',
    title: 'Operations',
    description: 'Dense workflow layout for active daily monitoring.',
  },
  {
    value: 'analyst',
    title: 'Analyst',
    description: 'Analysis-heavy workspace with larger data zones.',
  },
];

function PreviewSlot({
  title,
  instruction,
  skeletonClassName,
}: {
  title: string;
  instruction: string;
  skeletonClassName: string;
}) {
  return (
    <div className="rounded-md border bg-card p-2">
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{instruction}</p>
      <Skeleton className={`mt-2 ${skeletonClassName}`} />
    </div>
  );
}

function LayoutPreview({ preset }: { preset: LayoutPreset }) {
  if (preset === 'executive') {
    return (
      <div className="space-y-2">
        <PreviewSlot title="Financial Chart" instruction="Implement financial chart here." skeletonClassName="h-12 w-full rounded-sm" />
        <PreviewSlot title="KPI Row" instruction="Implement executive KPI cards here." skeletonClassName="h-8 w-full rounded-sm" />
        <PreviewSlot title="Risk Alerts" instruction="Implement risk and alerts feed here." skeletonClassName="h-7 w-full rounded-sm" />
      </div>
    );
  }

  if (preset === 'operations') {
    return (
      <div className="space-y-2">
        <PreviewSlot title="Incident Queue" instruction="Implement incidents queue here." skeletonClassName="h-10 w-full rounded-sm" />
        <PreviewSlot title="Throughput Chart" instruction="Implement workflow throughput chart here." skeletonClassName="h-10 w-full rounded-sm" />
        <PreviewSlot title="Runbook Timeline" instruction="Implement operations timeline here." skeletonClassName="h-8 w-full rounded-sm" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <PreviewSlot title="Query Filters" instruction="Implement advanced filters here." skeletonClassName="h-9 w-full rounded-sm" />
      <PreviewSlot title="Analysis Chart" instruction="Implement time-series analysis chart here." skeletonClassName="h-10 w-full rounded-sm" />
      <PreviewSlot title="Drill-down Table" instruction="Implement detail table here." skeletonClassName="h-8 w-full rounded-sm" />
    </div>
  );
}

function BooleanSetting({
  id,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border p-3">
      <div className="space-y-1">
        <Label htmlFor={id}>{title}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(nextState) => {
          onCheckedChange(nextState === true);
        }}
        className="mt-0.5"
      />
    </div>
  );
}

const Settings = ({ open, onOpenChange }: SettingsProps) => {
  const [preferences, setPreferences] = React.useState<DashboardPreferences>(DEFAULT_PREFERENCES);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<DashboardPreferences>;
      setPreferences((current) => ({ ...current, ...parsed }));
    } catch {
      // Ignore invalid preference payloads.
    }
  }, []);

  const setPreference = <K extends keyof DashboardPreferences>(key: K, value: DashboardPreferences[K]) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(preferences));
    window.dispatchEvent(new Event(PREFERENCES_UPDATED_EVENT));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Dashboard Settings</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] rounded-md border p-4">
          <div className="flex flex-col gap-6">
            {/* Layout Presets — full width, 3 cols */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Layout Presets</p>
                <p className="mt-1 text-xs text-muted-foreground">Choose the structure your team uses most during the day.</p>
              </div>
              <div className="grid gap-3 grid-cols-3">
                {LAYOUT_OPTIONS.map((option) => {
                  const isSelected = preferences.layout === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPreference('layout', option.value)}
                      className={`rounded-lg border p-3 text-left transition-colors ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40 hover:bg-accent/30'
                      }`}
                    >
                      <div className="mb-3 min-h-40 rounded-md border bg-background p-2">
                        <LayoutPreview preset={option.value} />
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">{option.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{option.description}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="mt-0.5 size-4 text-primary" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Two-column section: Appearance + Enterprise Controls side by side */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left: Appearance */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Appearance</p>
                <div className="rounded-md border p-3 space-y-4">
                  <div>
                    <p className="text-sm font-medium">Theme</p>
                    <p className="mt-1 text-xs text-muted-foreground">Switch between light and dark dashboard themes.</p>
                    <div className="mt-3">
                      <ToggleTheme />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium">Chart Colors</p>
                    <p className="mt-1 text-xs text-muted-foreground">Select a color scheme applied across all charts.</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {CHART_COLOR_SCHEMES.map((scheme) => {
                        const isSelected = preferences.chartColorScheme === scheme.value;
                        return (
                          <button
                            key={scheme.value}
                            type="button"
                            onClick={() => setPreference('chartColorScheme', scheme.value)}
                            className={`rounded-md border p-2 text-left transition-colors ${
                              isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40 hover:bg-accent/30'
                            }`}
                          >
                            <div className="h-6 w-full rounded-sm mb-1.5" style={{ background: `linear-gradient(to right, ${scheme.from}, ${scheme.to})` }} />
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium">{scheme.label}</p>
                              {isSelected && <CheckCircle2 className="size-3 text-primary" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Enterprise Controls */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Enterprise Controls</p>
                <div className="grid gap-3">
                  <BooleanSetting
                    id="live-refresh"
                    title="Live Refresh"
                    description="Auto-refresh widgets and lists for real-time operations."
                    checked={preferences.liveRefresh}
                    onCheckedChange={(v) => setPreference('liveRefresh', v)}
                  />
                  <BooleanSetting
                    id="compact-density"
                    title="Compact Density"
                    description="Display denser rows and cards for power users."
                    checked={preferences.compactDensity}
                    onCheckedChange={(v) => setPreference('compactDensity', v)}
                  />
                  <BooleanSetting
                    id="bulk-confirmation"
                    title="Bulk Action Confirmation"
                    description="Require extra confirmation before destructive bulk updates."
                    checked={preferences.requireBulkActionConfirmation}
                    onCheckedChange={(v) => setPreference('requireBulkActionConfirmation', v)}
                  />
                  <BooleanSetting
                    id="mask-sensitive"
                    title="Mask Sensitive Values"
                    description="Hide sensitive values by default until explicitly revealed."
                    checked={preferences.maskSensitiveValues}
                    onCheckedChange={(v) => setPreference('maskSensitiveValues', v)}
                  />
                  <BooleanSetting
                    id="anomaly-signals"
                    title="Anomaly Signals"
                    description="Show outlier and anomaly indicators across KPI panels."
                    checked={preferences.anomalySignals}
                    onCheckedChange={(v) => setPreference('anomalySignals', v)}
                  />
                  <BooleanSetting
                    id="weekly-digest"
                    title="Weekly Digest"
                    description="Send a summary digest to executives and team leads."
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(v) => setPreference('weeklyDigest', v)}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setPreferences(DEFAULT_PREFERENCES)}>
            Reset Defaults
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
