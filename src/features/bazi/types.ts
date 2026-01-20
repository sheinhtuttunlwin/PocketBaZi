// src/features/bazi/types.ts

export type Gender = 'male' | 'female' | 'other';

export type BaziInput = {
  birthDate: Date;
  timezone: string;
  gender: Gender;
  timeKnown: boolean;
};

export type BaziPillar = {
  pillar: 'year' | 'month' | 'day' | 'hour';
  stem: string;
  branch: string;
};

export type BaziChart = {
  mainPillars: BaziPillar[];
  dayMaster?: string;
  raw?: unknown; // temporary escape hatch
};

export type BaziBundle = {
  input: BaziInput;
  chart: BaziChart;
  interpretation?: string;
  dailyInsight?: string;
};
