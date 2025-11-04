import { CURRENCY_MINOR_DATA } from './currencyUnits';

export function getCurrencyMinorSymbol(currencyCode: string): string | null {
  return CURRENCY_MINOR_DATA[currencyCode]?.symbol || null;
}

export function convertCurrencyToMinorUnits(currencyCode: string, amount: number): number {
  const exponent = CURRENCY_MINOR_DATA[currencyCode]?.exponent || 2;
  const converted = amount * Math.pow(10, exponent);
  return Math.floor(converted * 100) / 100;
}

export function convertMinorToMajorUnits(currencyCode: string, amount: number): number {
  if (!CURRENCY_MINOR_DATA[currencyCode]) {
    return amount;
  }
  
const exponent = CURRENCY_MINOR_DATA[currencyCode].exponent;
    return amount / Math.pow(10, exponent);
}
