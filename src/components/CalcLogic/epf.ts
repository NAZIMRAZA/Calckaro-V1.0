export interface EpfInput {
  currentBalance: number;
  monthlyBasic: number;
  annualIncrement: number; // e.g., 5 (%)
  interestRate: number; // e.g., 8.25 (%)
  employeeContributionRate: number; // default 12 (%)
  employerContributionRate: number; // default 3.67 (%)
  tenureYears: number; // e.g., 30
}

export interface EpfResult {
  maturityAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
}

export function calculateEpf(input: EpfInput): EpfResult {
  const {
    currentBalance,
    monthlyBasic,
    annualIncrement,
    interestRate,
    employeeContributionRate,
    employerContributionRate,
    tenureYears
  } = input;

  let balance = currentBalance;
  let currentMonthlyBasic = monthlyBasic;
  let totalContributions = 0;
  const rateFraction = (interestRate / 100) / 12;

  for (let year = 1; year <= tenureYears; year++) {
    let yearInterest = 0;
    
    // Employee & Employer monthly contributions
    const monthlyContribution = currentMonthlyBasic * ((employeeContributionRate + employerContributionRate) / 100);

    for (let month = 1; month <= 12; month++) {
      balance += monthlyContribution;
      totalContributions += monthlyContribution;
      
      // Interest accumulates monthly based on the ending balance
      yearInterest += balance * rateFraction;
    }

    // Credited at the end of the fiscal year
    balance += yearInterest;

    // Apply annual salary increment
    currentMonthlyBasic = currentMonthlyBasic * (1 + (annualIncrement / 100));
  }

  const totalInterestEarned = Math.max(0, balance - currentBalance - totalContributions);

  return {
    maturityAmount: balance,
    totalContributions,
    totalInterestEarned
  };
}
