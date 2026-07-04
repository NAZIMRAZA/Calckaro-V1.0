export interface SalaryInput {
  annualCtc: number;
  basicPercentage: number; // e.g., 50
  epfOption: 'standard' | 'minimum' | 'none';
  gratuityIncluded: boolean;
  professionalTaxMonthly: number; // e.g., 200
}

export interface SalaryResult {
  monthlyGross: number;
  monthlyBasic: number;
  monthlyEpfEmployer: number;
  monthlyEpfEmployee: number;
  monthlyGratuity: number;
  monthlyProfessionalTax: number;
  monthlyIncomeTax: number;
  monthlyTakeHome: number;
  annualTaxableIncome: number;
}

/**
 * Calculates new regime income tax for FY 2025-26 (AY 2026-27).
 * Slabs:
 * - Up to ₹3L: Nil
 * - ₹3L to ₹7L: 5%
 * - ₹7L to ₹10L: 10%
 * - ₹10L to ₹12L: 15%
 * - ₹12L to ₹15L: 20%
 * - Above ₹15L: 30%
 * Rebate under Section 87A: If taxable income <= ₹7,00,000, net tax is 0.
 */
export function calculateNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 700000) {
    return 0; // Fully rebated
  }

  let tax = 0;
  
  if (taxableIncome > 1500000) {
    tax += (taxableIncome - 1500000) * 0.30;
    tax += 300000 * 0.20; // 12L to 15L
    tax += 200000 * 0.15; // 10L to 12L
    tax += 300000 * 0.10; // 7L to 10L
    tax += 400000 * 0.05; // 3L to 7L
  } else if (taxableIncome > 1200000) {
    tax += (taxableIncome - 1200000) * 0.20;
    tax += 200000 * 0.15;
    tax += 300000 * 0.10;
    tax += 400000 * 0.05;
  } else if (taxableIncome > 1000000) {
    tax += (taxableIncome - 1000000) * 0.15;
    tax += 300000 * 0.10;
    tax += 400000 * 0.05;
  } else if (taxableIncome > 700000) {
    tax += (taxableIncome - 700000) * 0.10;
    tax += 400000 * 0.05;
  } else if (taxableIncome > 300000) {
    tax += (taxableIncome - 300000) * 0.05;
  }

  // 4% health & education cess
  return tax * 1.04;
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { annualCtc, basicPercentage, epfOption, gratuityIncluded, professionalTaxMonthly } = input;

  const basicSalaryAnnual = annualCtc * (basicPercentage / 100);
  const monthlyBasic = basicSalaryAnnual / 12;

  // EPF Calculations
  let monthlyEpfEmployee = 0;
  let monthlyEpfEmployer = 0;

  if (epfOption === 'standard') {
    monthlyEpfEmployee = monthlyBasic * 0.12;
    monthlyEpfEmployer = monthlyBasic * 0.12;
  } else if (epfOption === 'minimum') {
    monthlyEpfEmployee = 1800;
    monthlyEpfEmployer = 1800;
  }

  // Gratuity calculation (4.81% of basic salary)
  let monthlyGratuity = 0;
  if (gratuityIncluded) {
    monthlyGratuity = monthlyBasic * (15 / 26 / 12); // pro-rata estimation
  }

  // Calculate gross monthly salary
  // Gross monthly = (CTC/12) - Employer EPF - Gratuity (if included in CTC)
  const monthlyGross = (annualCtc / 12) - monthlyEpfEmployer - monthlyGratuity;

  // Annual gross salary for tax calculation
  const annualGross = monthlyGross * 12;
  
  // Taxable Income = Annual Gross - Standard Deduction (75,000 for New Regime)
  const annualTaxableIncome = Math.max(0, annualGross - 75000);
  
  const annualTax = calculateNewRegimeTax(annualTaxableIncome);
  const monthlyIncomeTax = annualTax / 12;

  // Net In-hand Take-home
  const monthlyTakeHome = monthlyGross - monthlyEpfEmployee - professionalTaxMonthly - monthlyIncomeTax;

  return {
    monthlyGross,
    monthlyBasic,
    monthlyEpfEmployer,
    monthlyEpfEmployee,
    monthlyGratuity,
    monthlyProfessionalTax: professionalTaxMonthly,
    monthlyIncomeTax,
    monthlyTakeHome,
    annualTaxableIncome
  };
}
