export interface NoticePeriodSalaryInput {
  grossSalary: number;
  servedDays: number;
  totalDaysInMonth: number;
  lopLeaves: number;
}

export interface NoticePeriodSalaryResult {
  dailyRate: number;
  effectiveDays: number;
  noticeSalary: number;
  deductionAmount: number;
}

export function calculateNoticePeriodSalary(input: NoticePeriodSalaryInput): NoticePeriodSalaryResult {
  const { grossSalary, servedDays, totalDaysInMonth, lopLeaves } = input;

  const dailyRate = grossSalary / totalDaysInMonth;
  const effectiveDays = Math.max(0, servedDays - lopLeaves);
  const noticeSalary = dailyRate * effectiveDays;
  const deductionAmount = dailyRate * lopLeaves;

  return {
    dailyRate,
    effectiveDays,
    noticeSalary,
    deductionAmount
  };
}
