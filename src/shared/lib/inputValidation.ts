export const validateDecimalInput = (
    value: string,
    maxIntegerLength: number = 6,
    maxDecimalLength: number = 4
): boolean => {
    const normalizedValue = value.replace(/,/g, '.');
    const parts = normalizedValue.split('.');
    const integerPart = parts[0] || '';
    const decimalPart = parts[1] || '';

    if (!/^\d*$/.test(integerPart) || !/^\d*$/.test(decimalPart)) {
        return false;
    }

    if (integerPart.length > maxIntegerLength) {
        return false;
    }

    if (decimalPart.length > maxDecimalLength) {
        return false;
    }

    return true;
};
