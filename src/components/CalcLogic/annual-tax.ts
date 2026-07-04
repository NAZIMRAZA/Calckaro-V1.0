import { calculateNewRegimeTax } from './salary';
import { calculateOldRegimeTax } from './tax-regime';

export interface AnnualTaxInput {
  taxableSalary: number;
  otherIncome: number;
  totalDeductions: number;
  tdsDeposited: number;
  preferredRegime: 'old' | 'new';
}

export interface AnnualTaxResult {
  grossIncome: number;
  netTaxableIncome: number;
  totalTaxLiability: number;
  balancePayable: number;
  isRefund: boolean;
  statusLabel: string;
}

export function calculateAnnualTax(input: AnnualTaxInput): AnnualTaxResult {
  const { taxableSalary, otherIncome, totalDeductions, tdsDeposited, preferredRegime } = input;

  const grossIncome = taxableSalary + otherIncome;
  let netTaxableIncome = 0;
  let totalTaxLiability = 0;

  if (preferredRegime === 'new') {
    // Standard deduction of 75k already subtracted, or we apply it
    netTaxableIncome = Math.max(0, grossIncome - 75000);
    totalTaxLiability = calculateNewRegimeTax(netTaxableIncome);
  } else {
    // Old regime: standard deduction 50k + other deductions
    netTaxableIncome = Math.max(0, grossIncome - totalDeductions - 50000);
    totalTaxLiability = calculateOldRegimeTax(netTaxableIncome);
  }

  const balancePayable = Math.abs(totalTaxLiability - tdsDeposited);
  const isRefund = tdsDeposited > totalTaxLiability;
  const statusLabel = isRefund ? 'Tax Refundable' : 'Tax Payable (Due)';

  return {
    grossIncome,
    netTaxableIncome,
    totalTaxLiability,
    balancePayable,
    isRefund,
    statusLabel
  };
}
