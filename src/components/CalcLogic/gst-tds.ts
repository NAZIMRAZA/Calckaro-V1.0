export interface GstTdsInput {
  billAmount: number;
  gstRate: number; // e.g., 0.18
  tdsRate: number; // e.g., 0.10
  inclusiveOfGst: boolean;
}

export interface GstTdsResult {
  basicValue: number;
  gstAmount: number;
  invoiceValue: number;
  tdsAmount: number;
  netPayout: number;
}

/**
 * Calculates GST to add and TDS to deduct for freelance payments.
 * TDS is deducted ONLY on the basic value, not on the GST component.
 */
export function calculateGstTds(input: GstTdsInput): GstTdsResult {
  const { billAmount, gstRate, tdsRate, inclusiveOfGst } = input;

  let basicValue = 0;
  if (inclusiveOfGst) {
    basicValue = billAmount / (1 + gstRate);
  } else {
    basicValue = billAmount;
  }

  const gstAmount = basicValue * gstRate;
  const invoiceValue = basicValue + gstAmount;
  const tdsAmount = basicValue * tdsRate;
  
  // Net payout received = Invoice Value - TDS deducted
  const netPayout = invoiceValue - tdsAmount;

  return {
    basicValue,
    gstAmount,
    invoiceValue,
    tdsAmount,
    netPayout
  };
}
