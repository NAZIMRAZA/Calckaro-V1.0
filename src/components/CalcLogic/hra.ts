export interface HraInput {
  basicSalary: number;
  hraReceived: number;
  rentPaid: number;
  isMetro: boolean;
}

export interface HraResult {
  hraExempt: number;
  hraTaxable: number;
  rule1ActualHra: number;
  rule2RentMinusTenBasic: number;
  rule3BasicPercentage: number;
}

export function calculateHra(input: HraInput): HraResult {
  const { basicSalary, hraReceived, rentPaid, isMetro } = input;

  const rule1ActualHra = hraReceived;
  const rule2RentMinusTenBasic = Math.max(0, rentPaid - (basicSalary * 0.10));
  const rule3BasicPercentage = basicSalary * (isMetro ? 0.50 : 0.40);

  const hraExempt = Math.min(
    rule1ActualHra,
    rule2RentMinusTenBasic,
    rule3BasicPercentage
  );

  const hraTaxable = Math.max(0, hraReceived - hraExempt);

  return {
    hraExempt,
    hraTaxable,
    rule1ActualHra,
    rule2RentMinusTenBasic,
    rule3BasicPercentage
  };
}
