export const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

export const signed = (n) => (n > 0 ? `+${money(n)}` : money(n))
