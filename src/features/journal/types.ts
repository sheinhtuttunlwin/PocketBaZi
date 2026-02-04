export type JournalEntry = {
  text: string;
  updatedAt: string; // ISO 8601 timestamp
};

export type JournalStorageResult = {
  entry: JournalEntry | null;
  error?: string;
};
