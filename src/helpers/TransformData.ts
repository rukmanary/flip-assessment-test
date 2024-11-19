/* eslint-disable curly */
interface FormatCurrency {
  value: number;
  locale?: string;
  currency?: string;
}
interface FormatDate {
  input: string;
  locale?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
}

const transformObjectToArray = <T, R = T>(data: Record<string, T>): R[] => {
  return Object.entries(data).map(([_, value]) => value as unknown as R);
};

const formatCurrency = ({
  value,
  locale = 'id-ID',
  currency = 'IDR',
}: FormatCurrency): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

const formatDate = ({
  input,
  locale = 'id-ID',
  formatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
}: FormatDate): string => {
  const date = new Date(input);

  const options: Intl.DateTimeFormatOptions = formatOptions;

  return new Intl.DateTimeFormat(locale, options).format(date);
};

const formatUpperCase = (name: string): string => {
  const nameLength = name?.length;
  if (nameLength <= 4) return name?.toUpperCase?.();
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export { formatCurrency, formatDate, formatUpperCase, transformObjectToArray };
