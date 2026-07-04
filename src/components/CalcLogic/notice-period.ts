export interface NoticePeriodInput {
  grossSalary: number;
  requiredDays: number;
  servedDays: number;
  buyoutPayer: 'employee' | 'employer';
}

export interface NoticePeriodResult {
  unservedDays: number;
  dailyRate: number;
  buyoutAmount: number;
  payerLabel: string;
}

/**
 * Calculates pro-rata notice period buyout amount based on Indian payroll standards.
 * Daily rate is calculated as Gross Monthly Salary / 30 days.
 */
export function calculateNoticePeriod(input: NoticePeriodInput): NoticePeriodResult {
  const { grossSalary, requiredDays, servedDays, buyoutPayer } = input;
  
  const unservedDays = Math.max(0, requiredDays - servedDays);
  const dailyRate = grossSalary / 30;
  const buyoutAmount = dailyRate * unservedDays;
  
  const payerLabel = buyoutPayer === 'employee'
    ? 'Amount you owe your employer'
    : 'Amount your employer owes you';

  return {
    unservedDays,
    dailyRate,
    buyoutAmount,
    payerLabel
  };
}
