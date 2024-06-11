export function getCurrencySymbol(currencyCode: string, locale: string = 'en-US'): string {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const parts = formatter.formatToParts(0);
    const currencyPart = parts.find(part => part.type === 'currency');
    return currencyPart ? currencyPart.value : '';
}

export function roundRateValue(value: number | string, precision = 2):number {
    const valueWithEps = Math.round(Number(value + "e" + precision));
    return Number(valueWithEps + "e" + -precision);
}
