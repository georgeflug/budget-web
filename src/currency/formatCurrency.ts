import React from "react";

const numberFormatExact = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
const numberFormatRounded = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0});

export function formatCurrency(amount: number) {
  return numberFormatExact.format(amount)
}

export function formatCurrencyExact(amount: number) {
  return goGreen(amount, numberFormatExact);
}

export function formatCurrencyRounded(amount: number) {
  return goGreen(amount, numberFormatRounded);
}

function goGreen(amount: number, formatter: Intl.NumberFormat) {
  if (amount < 0) {
    const text = formatter.format(-amount);
    return React.createElement('div', { style: { color: 'green' } }, `+${text}`);
  }
  return formatter.format(amount);
}