/**
 * useBaziBundle: React hook to consume the BaZi store
 */

import { useEffect, useState } from 'react';
import { baziStore, type BaziStoreState } from './bazi-store';

export function useBaziBundle() {
  const [state, setState] = useState<BaziStoreState>(baziStore.getState());

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = baziStore.subscribe(setState);

    // Load bundle when hook mounts
    baziStore.load();

    return unsubscribe;
  }, []);

  return {
    bundle: state.bundle,
    loading: state.loading,
    error: state.error,
    refresh: baziStore.refresh,
  };
}
