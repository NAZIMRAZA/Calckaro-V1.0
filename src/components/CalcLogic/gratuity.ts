export interface GratuityInput {
  basicSalary: number;
  completedYears: number;
}

export interface GratuityResult {
  gratuityAmount: number;
  eligible: boolean;
  taxExemptAmount: number;
  taxableAmount: number;
  explanation: string;
}

export function calculateGratuity(input: GratuityInput): GratuityResult {
  const { basicSalary, completedYears } = input;

  const eligible = completedYears >= 5;
  let gratuityAmount = 0;

  if (eligible) {
    gratuityAmount = (basicSalary * 15 / 26) * completedYears;
  }

  // Capped at ₹25L under Payment of Gratuity Act
  const maxTaxExempt = 2500000;
  const taxExemptAmount = Math.min(gratuityAmount, maxTaxExempt);
  const taxableAmount = Math.max(0, gratuityAmount - taxExemptAmount);

  const explanation = eligible
    ? `Eligible for gratuity calculation. Completed ${completedYears} years.`
    : `Not eligible. Gratuity requires a minimum of 5 years of continuous service.`;

  return {
    gratuityAmount,
    eligible,
    taxExemptAmount,
    taxableAmount,
    explanation
  };
}
