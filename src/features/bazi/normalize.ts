// src/features/bazi/normalize.ts

import type { BaziChart, BaziInput, BaziPillar } from './types';

function splitChineseGanZhi(chinese?: string): { stem: string; branch: string } {
  const s = String(chinese ?? '');
  // Most outputs are exactly 2 Chinese chars, e.g. "丁丑"
  // If not, we fail safely with empty strings.
  return {
    stem: s.length >= 1 ? s[0] : '',
    branch: s.length >= 2 ? s[1] : '',
  };
}

export function normalizeAnalysisToChart(analysis: any, _input: BaziInput): BaziChart {
  // Library shape (from your log):
  // analysis.mainPillars = { year, month, day, time }
  const mp = analysis?.mainPillars ?? {};

  const year = splitChineseGanZhi(mp?.year?.chinese);
  const month = splitChineseGanZhi(mp?.month?.chinese);
  const day = splitChineseGanZhi(mp?.day?.chinese);
  const hour = splitChineseGanZhi(mp?.time?.chinese); // IMPORTANT: library uses "time"

  const mainPillars: BaziPillar[] = [
    { pillar: 'year', stem: year.stem, branch: year.branch },
    { pillar: 'month', stem: month.stem, branch: month.branch },
    { pillar: 'day', stem: day.stem, branch: day.branch },
    { pillar: 'hour', stem: hour.stem, branch: hour.branch },
  ];

  return {
    mainPillars,
    // From your log: analysis.basicAnalysis.dayMaster.stem === "庚"
    dayMaster: analysis?.basicAnalysis?.dayMaster?.stem,
    raw: analysis, // keep for now
  };
}
