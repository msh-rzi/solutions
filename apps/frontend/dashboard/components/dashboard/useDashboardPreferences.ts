'use client';

import * as React from 'react';

export type DashboardLayoutPreset = 'balanced' | 'analytics' | 'operations';
export type DashboardDensity = 'comfortable' | 'compact';
export type DashboardSurface = 'elevated' | 'flat' | 'glass';
export type DashboardAccent = 'slate' | 'emerald' | 'blue' | 'amber';

export interface DashboardPreferences {
  layout: DashboardLayoutPreset;
  density: DashboardDensity;
  surface: DashboardSurface;
  accent: DashboardAccent;
}

const STORAGE_VERSION = 'v1';

const DEFAULT_PREFERENCES: DashboardPreferences = {
  layout: 'balanced',
  density: 'comfortable',
  surface: 'elevated',
  accent: 'slate',
};

const allowedLayouts = new Set<DashboardLayoutPreset>(['balanced', 'analytics', 'operations']);
const allowedDensity = new Set<DashboardDensity>(['comfortable', 'compact']);
const allowedSurfaces = new Set<DashboardSurface>(['elevated', 'flat', 'glass']);
const allowedAccents = new Set<DashboardAccent>(['slate', 'emerald', 'blue', 'amber']);

const normalizePreferences = (input: Partial<DashboardPreferences> | null | undefined): DashboardPreferences => ({
  layout: allowedLayouts.has(input?.layout ?? 'balanced') ? (input?.layout as DashboardLayoutPreset) : DEFAULT_PREFERENCES.layout,
  density: allowedDensity.has(input?.density ?? 'comfortable') ? (input?.density as DashboardDensity) : DEFAULT_PREFERENCES.density,
  surface: allowedSurfaces.has(input?.surface ?? 'elevated') ? (input?.surface as DashboardSurface) : DEFAULT_PREFERENCES.surface,
  accent: allowedAccents.has(input?.accent ?? 'slate') ? (input?.accent as DashboardAccent) : DEFAULT_PREFERENCES.accent,
});

const getStorageKey = (userId: string) => `dashboard.preferences.${STORAGE_VERSION}:${userId}`;

export function useDashboardPreferences(userId: string | undefined) {
  const resolvedUserId = userId?.trim() || 'guest';
  const storageKey = React.useMemo(() => getStorageKey(resolvedUserId), [resolvedUserId]);
  const [preferences, setPreferences] = React.useState<DashboardPreferences>(DEFAULT_PREFERENCES);
  const [isHydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setHydrated(false);

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as DashboardPreferences;
        setPreferences(normalizePreferences(parsed));
      } else {
        setPreferences(DEFAULT_PREFERENCES);
      }
    } catch {
      setPreferences(DEFAULT_PREFERENCES);
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  React.useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
  }, [isHydrated, preferences, storageKey]);

  const setPreference = React.useCallback(<K extends keyof DashboardPreferences>(key: K, value: DashboardPreferences[K]) => {
    setPreferences((current) => {
      if (current[key] === value) {
        return current;
      }

      return {
        ...current,
        [key]: value,
      };
    });
  }, []);

  const resetPreferences = React.useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  return {
    preferences,
    isHydrated,
    setPreference,
    resetPreferences,
  };
}
