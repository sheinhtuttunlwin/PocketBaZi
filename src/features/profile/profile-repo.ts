// src/features/profile/profile-repo.ts

import type { Profile } from './types';

/**
 * ProfileRepo: Repository interface for Profile CRUD operations.
 * Screens must use this interface; they do NOT import AsyncStorage directly.
 */
export interface ProfileRepo {
  /**
   * Load the stored profile.
   * @returns The saved Profile, or null if none exists.
   */
  getProfile(): Promise<Profile | null>;

  /**
   * Save or update the profile.
   * @param profile The profile to persist (name must not be empty).
   */
  saveProfile(profile: Profile): Promise<void>;

  /**
   * Delete the stored profile.
   */
  clearProfile(): Promise<void>;
}
