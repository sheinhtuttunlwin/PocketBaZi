/**
 * BaZi Store: Shared in-memory cache for BaZi calculations.
 * 
 * Avoids recalculating the BaZi chart when:
 * - Switching tabs within dashboard
 * - Navigating between screens
 * 
 * Only recalculates when:
 * - Chart key changes (profile changed)
 * - Date changes (daily insight refresh)
 * - Manual refresh triggered
 */

import { profileRepo } from '@/src/features/profile/profile-repo-instance';
import { runBaziPipeline } from './pipeline';
import type { BaziBundle, BaziInput } from './types';

/** Derive a cache key from BaziInput */
function getChartKey(input: BaziInput): string {
  const timeStr = input.birthTime ? input.birthTime.toISOString() : 'no-time';
  return `${input.birthDate.toISOString()}|${input.timezone}|${input.gender}|${input.timeKnown}|${timeStr}`;
}

/** Get today's date key (YYYY-MM-DD) */
function getTodayKey(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/** Store state */
interface BaziStoreState {
  bundle: BaziBundle | null;
  chartKey: string | null; // Key of the cached chart
  dateKey: string | null; // Date key of the cached daily insight
  loading: boolean;
  error: string | null;
}

let storeState: BaziStoreState = {
  bundle: null,
  chartKey: null,
  dateKey: null,
  loading: false,
  error: null,
};

/** Listeners for state changes */
type Listener = (state: BaziStoreState) => void;
let listeners: Set<Listener> = new Set();

/** Subscribe to store changes */
function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Notify all listeners of state change */
function notifyListeners() {
  listeners.forEach(listener => listener(storeState));
}

/** Load and cache BaZi bundle if needed */
async function load() {
  const profile = await profileRepo.getProfile();
  
  if (!profile) {
    storeState = {
      bundle: null,
      chartKey: null,
      dateKey: null,
      loading: false,
      error: null,
    };
    notifyListeners();
    return;
  }

  const newChartKey = getChartKey(profile.baziInput);
  const todayKey = getTodayKey();

  // If chart key matches, we already have the right data
  // Only check if we need to refresh daily insight
  if (storeState.chartKey === newChartKey && storeState.bundle) {
    // Chart is the same; check if daily insight needs refresh
    if (storeState.dateKey === todayKey) {
      // Chart AND date match; nothing to do
      return;
    }
    
    // Date changed, but chart is same; update the bundle with today's date
    // and optionally re-fetch daily insight (for now, just update dateKey)
    storeState.dateKey = todayKey;
    notifyListeners();
    return;
  }

  // Chart key differs; need to recalculate
  storeState.loading = true;
  notifyListeners();

  try {
    const bundle = await runBaziPipeline(profile.baziInput);
    storeState = {
      bundle,
      chartKey: newChartKey,
      dateKey: todayKey,
      loading: false,
      error: null,
    };
  } catch (err) {
    console.error('[BaziStore] Pipeline error:', err);
    storeState = {
      bundle: null,
      chartKey: null,
      dateKey: null,
      loading: false,
      error: err instanceof Error ? err.message : 'Failed to calculate BaZi',
    };
  }

  notifyListeners();
}

/** Force recalculation */
async function refresh() {
  storeState.chartKey = null; // Force recalculation
  await load();
}

/** Get current state */
function getState(): BaziStoreState {
  return { ...storeState };
}

export const baziStore = {
  load,
  refresh,
  getState,
  subscribe,
};

export type { BaziStoreState };
