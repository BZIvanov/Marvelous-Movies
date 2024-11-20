export const currencyFormatter = (
  value,
  { fractionDigits = 2, locale = 'en-US' } = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const percentFormatter = (
  value,
  { fractionDigits = 0, locale = 'en-US' } = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const dateFormatter = (value, { locale = 'en-US', ...options } = {}) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat(locale, options).format(date);
};
