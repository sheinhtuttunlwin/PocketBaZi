import { useCallback, useEffect, useRef, useState } from 'react';
import { loadJournalEntry, saveJournalEntry, getTodayDateKey } from './journal-repo';
import type { JournalEntry } from './types';

type UseJournalReturn = {
  text: string;
  setText: (text: string) => void;
  loading: boolean;
  error: string | null;
  dateKey: string;
};

/**
 * Hook for managing daily journal entries with debounced autosave.
 * Automatically loads the entry for today and handles date changes.
 */
export function useJournal(): UseJournalReturn {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateKey, setDateKey] = useState(getTodayDateKey());

  // Refs for debouncing and tracking state
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textRef = useRef(text);

  // Update the ref whenever text changes (for the save callback)
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  /**
   * Loads the journal entry for the current dateKey.
   */
  const loadEntry = useCallback(async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loadJournalEntry(key);
      if (result.error) {
        setError(result.error);
        setText('');
      } else {
        setText(result.entry?.text ?? '');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error loading entry';
      setError(message);
      setText('');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Saves the current text to storage.
   */
  const saveEntry = useCallback(async (textToSave: string, key: string) => {
    try {
      const result = await saveJournalEntry(key, textToSave);
      if (result.error) {
        console.error('Error saving journal entry:', result.error);
      }
    } catch (err) {
      console.error('Unexpected error saving journal entry:', err);
    }
  }, []);

  /**
   * Debounced save: clears pending save and schedules a new one.
   */
  const debouncedSave = useCallback(
    (currentText: string, key: string) => {
      // Clear any pending save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Schedule a new save after 1 second of inactivity
      saveTimeoutRef.current = setTimeout(() => {
        saveEntry(currentText, key);
        saveTimeoutRef.current = null;
      }, 1000);
    },
    [saveEntry]
  );

  /**
   * Check for date changes periodically (every minute).
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const newDateKey = getTodayDateKey();
      if (newDateKey !== dateKey) {
        setDateKey(newDateKey);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dateKey]);

  /**
   * Load entry when dateKey changes.
   */
  useEffect(() => {
    loadEntry(dateKey);
  }, [dateKey, loadEntry]);

  /**
   * Handle text changes with debounced save.
   */
  const handleTextChange = useCallback(
    (newText: string) => {
      setText(newText);
      debouncedSave(newText, dateKey);
    },
    [dateKey, debouncedSave]
  );

  /**
   * Cleanup: save any pending changes on unmount.
   */
  useEffect(() => {
    return () => {
      // Cancel pending timeout and save immediately if needed
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      // Force save current text if it exists
      if (textRef.current.length > 0) {
        saveEntry(textRef.current, dateKey);
      }
    };
  }, [dateKey, saveEntry]);

  return {
    text,
    setText: handleTextChange,
    loading,
    error,
    dateKey,
  };
}
