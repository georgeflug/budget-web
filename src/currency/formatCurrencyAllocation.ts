import React from "react";

const numberFormatRounded = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0});

export function formatCurrencyAllocation(amount: number) {
  if (amount < 0) {
    const text = numberFormatRounded.format(-amount);
    return React.createElement('div', { style: { color: 'red' } }, `${text} over`);
  }
  return `${numberFormatRounded.format(amount)} left`;
}
