export const formatCurrency = (value: number) => {
  if (!value && value !== 0) return "0"

  return new Intl.NumberFormat().format(value)
}