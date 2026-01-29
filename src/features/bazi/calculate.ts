// src/features/bazi/calculate.ts

import type { BaziInput } from './types';

export async function calculateRawAnalysis(input: BaziInput) {
  const mod = await import('@aharris02/bazi-calculator-by-alvamind');
  const BaziCalculator = (mod as any).BaziCalculator;

  // Create a date that combines birthDate with birthTime if available
  let calculationDate = input.birthDate;
  if (input.timeKnown && input.birthTime) {
    // Create a new date with the same date but the time from birthTime
    const combinedDate = new Date(input.birthDate);
    combinedDate.setHours(
      input.birthTime.getHours(),
      input.birthTime.getMinutes(),
      0,
      0
    );
    calculationDate = combinedDate;
  }

  const calculator = new BaziCalculator(
    calculationDate,
    String(input.gender),
    String(input.timezone),
    input.timeKnown
  );

  return calculator.getCompleteAnalysis();
}
