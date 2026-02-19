'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, Checkbox, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Label, ScrollArea, Separator, Skeleton, ToggleTheme } from '@repo/ui-shadcn';

type SettingsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type LayoutPreset = 'executive' | 'operations' | 'analyst';

type DashboardPreferences = {
  layout: LayoutPreset;
  liveRefresh: boolean;
  compactDensity: boolean;
  requireBulkActionConfirmation: boolean;
  maskSensitiveValues: boolean;
  anomalySignals: boolean;
  weeklyDigest: boolean;
};

const SETTINGS_STORAGE_KEY = 'dashboard.preferences.v1';

const DEFAULT_PREFERENCES: DashboardPreferences = {
  layout: 'executive',
  liveRefresh: true,
  compactDensity: false,
  requireBulkActionConfirmation: true,
  maskSensitiveValues: true,
  anomalySignals: true,
  weeklyDigest: false,
};

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

function LayoutPreview({ preset }: { preset: LayoutPreset }) {
  if (preset === 'executive') {
    return (
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-24" />
        <div className="grid grid-cols-3 gap-1.5">
          <Skeleton className="h-7 rounded-sm" />
          <Skeleton className="h-7 rounded-sm" />
          <Skeleton className="h-7 rounded-sm" />
        </div>
        <Skeleton className="h-10 rounded-sm" />
      </div>
    );
  }

  if (preset === 'operations') {
    return (
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-20" />
        <div className="grid grid-cols-4 gap-1.5">
          <Skeleton className="col-span-1 h-12 rounded-sm" />
          <Skeleton className="col-span-3 h-12 rounded-sm" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <Skeleton className="h-6 rounded-sm" />
          <Skeleton className="h-6 rounded-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Skeleton className="h-2.5 w-24" />
      <div className="grid grid-cols-3 gap-1.5">
        <Skeleton className="col-span-2 h-12 rounded-sm" />
        <Skeleton className="col-span-1 h-12 rounded-sm" />
      </div>
      <Skeleton className="h-6 rounded-sm" />
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
                      <div className="mb-3 min-h-20 rounded-md border bg-background p-2">
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
                <div className="rounded-md border p-3">
                  <p className="text-sm font-medium">Theme</p>
                  <p className="mt-1 text-xs text-muted-foreground">Switch between light and dark dashboard themes.</p>
                  <div className="mt-3">
                    <ToggleTheme />
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

