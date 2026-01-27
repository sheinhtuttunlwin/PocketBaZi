// src/features/profile/profile-repo-instance.ts

import LocalProfileRepo from './local-profile-repo';

/**
 * Singleton instance of ProfileRepo.
 * Screens import and use this instance; they do NOT create new instances.
 */
export const profileRepo = new LocalProfileRepo();
