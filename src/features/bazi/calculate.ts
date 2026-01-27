// src/features/bazi/calculate.ts

import type { BaziInput } from './types';

export async function calculateRawAnalysis(input: BaziInput) {
  const mod = await import('@aharris02/bazi-calculator-by-alvamind');
  const BaziCalculator = (mod as any).BaziCalculator;

  const calculator = new BaziCalculator(
    input.birthDate,
    String(input.gender),
    String(input.timezone),
    input.timeKnown
  );

  return calculator.getCompleteAnalysis();
}
