import AsyncStorage from '@react-native-async-storage/async-storage';
import type { JournalEntry, JournalStorageResult } from './types';

const VERSION = 'v1';
const PREFIX = 'pocketbazi:journal';

/**
 * Gets the storage key for a given date.
 * @param dateKey YYYY-MM-DD format (local date)
 */
function getStorageKey(dateKey: string): string {
  return `${PREFIX}:${VERSION}:${dateKey}`;
}

/**
 * Gets today's date in YYYY-MM-DD format (local time, not UTC).
 */
export function getTodayDateKey(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Loads a journal entry for the given date key.
 */
export async function loadJournalEntry(dateKey: string): Promise<JournalStorageResult> {
  try {
    const key = getStorageKey(dateKey);
    const jsonStr = await AsyncStorage.getItem(key);

    if (!jsonStr) {
      return { entry: null };
    }

    const entry: JournalEntry = JSON.parse(jsonStr);
    return { entry };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error loading journal entry';
    console.error(`Failed to load journal entry for ${dateKey}:`, message);
    return { entry: null, error: message };
  }
}

/**
 * Saves a journal entry for the given date key.
 */
export async function saveJournalEntry(
  dateKey: string,
  text: string
): Promise<JournalStorageResult> {
  try {
    const key = getStorageKey(dateKey);
    const entry: JournalEntry = {
      text,
      updatedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(entry));
    return { entry };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error saving journal entry';
    console.error(`Failed to save journal entry for ${dateKey}:`, message);
    return { entry: null, error: message };
  }
}

/**
 * Deletes a journal entry for the given date key.
 */
export async function deleteJournalEntry(dateKey: string): Promise<void> {
  try {
    const key = getStorageKey(dateKey);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error deleting journal entry';
    console.error(`Failed to delete journal entry for ${dateKey}:`, message);
  }
}

/**
 * Clears all journal entries.
 */
export async function clearAllJournalEntries(): Promise<void> {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const journalKeys = allKeys.filter((key) => key.startsWith(PREFIX));
    await AsyncStorage.multiRemove(journalKeys);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error clearing journal entries';
    console.error('Failed to clear journal entries:', message);
  }
}
