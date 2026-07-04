import { calculateNewRegimeTax } from './salary';

export interface TaxRegimeInput {
  annualIncome: number;
  deduction80C: number; // Max 1.5L
  deduction80D: number; // Max 25k/50k
  hraExemption: number;
  homeLoanInterest: number; // Max 2L
  otherDeductions: number;
}

export interface TaxRegimeResult {
  oldRegimeTaxable: number;
  newRegimeTaxable: number;
  oldRegimeTax: number;
  newRegimeTax: number;
  netSavings: number;
  recommendedRegime: 'Old' | 'New';
}

/**
 * Calculates old regime tax for FY 2025-26.
 * Slabs:
 * - Up to ₹2.5L: Nil
 * - ₹2.5L to ₹5L: 5%
 * - ₹5L to ₹10L: 20%
 * - Above ₹10L: 30%
 * Rebate under Section 87A: If taxable income <= ₹5,00,000, net tax is 0.
 */
export function calculateOldRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 500000) {
    return 0; // Fully rebated
  }

  let tax = 0;

  if (taxableIncome > 1000000) {
    tax += (taxableIncome - 1000000) * 0.30;
    tax += 500000 * 0.20; // 5L to 10L
    tax += 250000 * 0.05; // 2.5L to 5L
  } else if (taxableIncome > 500000) {
    tax += (taxableIncome - 500000) * 0.20;
    tax += 250000 * 0.05;
  } else if (taxableIncome > 250000) {
    tax += (taxableIncome - 250000) * 0.05;
  }

  // 4% health & education cess
  return tax * 1.04;
}

export function calculateTaxRegime(input: TaxRegimeInput): TaxRegimeResult {
  const { annualIncome, deduction80C, deduction80D, hraExemption, homeLoanInterest, otherDeductions } = input;

  // 1. Old Regime Calculations
  // Total deductions = standard deduction (50,000) + 80C (max 1.5L) + 80D (max 25k/50k) + HRA + Home Loan (max 2L) + others
  const capped80C = Math.min(150000, deduction80C);
  const cappedHomeLoan = Math.min(200000, homeLoanInterest);
  const totalOldDeductions = 50000 + capped80C + deduction80D + hraExemption + cappedHomeLoan + otherDeductions;
  
  const oldRegimeTaxable = Math.max(0, annualIncome - totalOldDeductions);
  const oldRegimeTax = calculateOldRegimeTax(oldRegimeTaxable);

  // 2. New Regime Calculations
  // Total deductions = standard deduction (75,000). No other exemptions allowed.
  const newRegimeTaxable = Math.max(0, annualIncome - 75000);
  const newRegimeTax = calculateNewRegimeTax(newRegimeTaxable);

  // Compare & Savings
  const netSavings = Math.abs(oldRegimeTax - newRegimeTax);
  const recommendedRegime = oldRegimeTax < newRegimeTax ? 'Old' : 'New';

  return {
    oldRegimeTaxable,
    newRegimeTaxable,
    oldRegimeTax,
    newRegimeTax,
    netSavings,
    recommendedRegime
  };
}
