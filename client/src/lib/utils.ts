// client/lib/utils.ts
export const fmt = (n: number) =>
  "₦" + (n / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 });

export const toUSD = (kobo: number, rate: number) => {
  const naira = kobo / 100;
  const usd = naira / rate;
  return "$" + usd.toLocaleString("en-US", { minimumFractionDigits: 2 });
};
