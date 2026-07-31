export const MANDATORY_PRICE_DISCLAIMER = "Precios sujetos a disponibilidad y cambios sin previo aviso";

export function formatPrice(amount: number, currency: string = "MXN"): string {
  const formatted = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} ${currency}*`;
}
