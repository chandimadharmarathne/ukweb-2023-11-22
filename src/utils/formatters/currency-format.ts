export const currencyFormat = (amount: number) => {
  const FORMATTER = Intl.NumberFormat(undefined, {
    currency: "LKR",
    style: "currency",
    maximumFractionDigits: 2,
  });
  return FORMATTER.format(amount);
};
