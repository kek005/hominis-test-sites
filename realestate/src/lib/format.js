export const money = (n, frac = 0) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: frac }).format(n)

export const num = (n) => new Intl.NumberFormat('en-US').format(n)
