// src/features/profile/local-profile-repo.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ProfileRepo } from './profile-repo';
import type { Profile } from './types';

const PROFILE_STORAGE_KEY = '@pocketbazi/profile';

/**
 * Serializable version of Profile for AsyncStorage.
 * Date is stored as ISO string.
 */
type SerializedProfile = {
  name: string;
  baziInput: {
    birthDate: string; // ISO string
    timezone: string;
    gender: string;
    timeKnown: boolean;
  };
};

/**
 * LocalProfileRepo: AsyncStorage-based implementation of ProfileRepo.
 * Handles Date ↔ ISO string conversion automatically.
 */
class LocalProfileRepo implements ProfileRepo {
  async getProfile(): Promise<Profile | null> {
    try {
      const json = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (!json) return null;

      const serialized: SerializedProfile = JSON.parse(json);
      
      // Convert ISO string back to Date
      const profile: Profile = {
        name: serialized.name,
        baziInput: {
          birthDate: new Date(serialized.baziInput.birthDate),
          timezone: serialized.baziInput.timezone,
          gender: serialized.baziInput.gender as 'male' | 'female' | 'other',
          timeKnown: serialized.baziInput.timeKnown,
        },
      };

      return profile;
    } catch (error) {
      console.error('[LocalProfileRepo] Error loading profile:', error);
      return null;
    }
  }

  async saveProfile(profile: Profile): Promise<void> {
    try {
      // Convert Date to ISO string
      const serialized: SerializedProfile = {
        name: profile.name,
        baziInput: {
          birthDate: profile.baziInput.birthDate.toISOString(),
          timezone: profile.baziInput.timezone,
          gender: profile.baziInput.gender,
          timeKnown: profile.baziInput.timeKnown,
        },
      };

      const json = JSON.stringify(serialized);
      await AsyncStorage.setItem(PROFILE_STORAGE_KEY, json);
    } catch (error) {
      console.error('[LocalProfileRepo] Error saving profile:', error);
      throw error;
    }
  }

  async clearProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch (error) {
      console.error('[LocalProfileRepo] Error clearing profile:', error);
      throw error;
    }
  }
}

export default LocalProfileRepo;
