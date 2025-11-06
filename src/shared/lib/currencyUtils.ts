import { CURRENCY_MINOR_DATA } from './currencyUnits';

export function getCurrencyMinorSymbol(currencyCode: string): string | null {
  return CURRENCY_MINOR_DATA[currencyCode]?.symbol || null;
}

export function convertCurrencyToMinorUnits(currencyCode: string, amount: number): number {
  if (!CURRENCY_MINOR_DATA[currencyCode]) {
    return amount;
  }
  
  const exponent = CURRENCY_MINOR_DATA[currencyCode].exponent;
  const converted = amount * Math.pow(10, exponent);

  return Math.floor(converted * 10000) / 10000;
}

export function convertMinorToMajorUnits(currencyCode: string, amount: number): number {
  if (!CURRENCY_MINOR_DATA[currencyCode]) {
    return amount;
  }
  
  const exponent = CURRENCY_MINOR_DATA[currencyCode].exponent;
  const divisor = Math.pow(10, exponent);
  const result = amount / divisor;

  return Math.floor(result * 1000000) / 1000000;
}
