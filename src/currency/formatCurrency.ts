const numberFormatExact = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
const numberFormatRounded = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0});

export function formatCurrencyExact(amount: number) {
  return numberFormatExact.format(amount);
}

export function formatCurrencyRounded(amount: number) {
  return numberFormatRounded.format(amount);
}
