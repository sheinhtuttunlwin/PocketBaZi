// src/features/profile/types.ts

import type { BaziInput } from '@/src/features/bazi/types';

/**
 * Profile: The single source of truth for user identity and BaZi details.
 * Stored locally and designed to sync to Supabase later.
 * 
 * name is mandatory (never optional).
 */
export type Profile = {
  name: string; // REQUIRED - enforced via type system
  baziInput: BaziInput;
};
