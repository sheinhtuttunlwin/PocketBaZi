// src/features/bazi/pipeline.ts

import { DeepSeekService } from '@/services/deepseek';
import { calculateRawAnalysis } from './calculate';
import { normalizeAnalysisToChart } from './normalize';
import type { BaziBundle, BaziInput } from './types';

export async function runBaziPipeline(input: BaziInput): Promise<BaziBundle> {
  const analysis = await calculateRawAnalysis(input);
  const chart = normalizeAnalysisToChart(analysis, input);

  let interpretation: string | undefined;
  let dailyInsight: string | undefined;

  try {
    interpretation = await DeepSeekService.interpretBaziChart(chart);
  } catch (e) {
    console.log('DeepSeek interpretBaziChart failed:', e);
  }

  try {
    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    dailyInsight = await DeepSeekService.getDailyInsight(chart, currentDate);
  } catch (e) {
    console.log('DeepSeek getDailyInsight failed:', e);
  }

  return { input, chart, interpretation, dailyInsight };
}
