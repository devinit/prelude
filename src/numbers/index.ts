export const addSuffix = (val) => {
    // Borrowed from old datahub codebase
    const lastDigit = (val % 10);
    const lastTwoDigits = (val % 100);
    const suffixObj = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    const exceptions = [11, 12, 13];
    if (exceptions.indexOf(lastTwoDigits) === -1) {
        return val + suffixObj[lastDigit];
    }
    return val + 'th';
};

export const getMaxAndMin = (data: Array<{year?: number | null}>): number[] => {
    const years = data
        .map(obj => {
            if (obj && obj.year) return Number(obj.year);
            return null;
        })
        .filter(year => year !== null);
    if (!years) return [0, 0];
    const max: number = Math.max.apply(null, years);
    const min: number = Math.min.apply(null, years);
    return [max, min];
};

const removeTrailingZero = (value: string): string => {
    const val = Number(value);
    return  Math.round(val) === val ? val.toString() : value;
};

export const THOUSAND = 1e3;
export const MILLION = 1e6;
export const BILLION = 1e9;
export const TRILLION = 1e12;

// (10 ** length) == Math.pow(10, length);
export const roundNum = (num, length): string =>
    (Math.round(num * (10 ** length)) / (10 ** length)).toFixed(length);

export const approximate =
    (value: number | string | undefined | null,
     precision: number = 1,
     shouldrRemoveTrailingZero: boolean = false): string => {
    if (value === undefined || value === null) return 'No data';
    const val = Number(value);
    const absValue = Math.abs(val);
    if (absValue < 1e3) {
        const fixed = roundNum(val, precision);
        return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}` : fixed;
    } else if (absValue >= 1e3 && absValue < 1e6) {
        const newValue = val / 1e3;
        const fixed = roundNum(newValue, precision);
        return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}k` : `${fixed}k`;
    } else if (absValue >= 1e6 && absValue < 1e9) {
        const newValue = val / 1e6;
        const fixed = roundNum(newValue, precision);
        return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}m` : `${fixed}m`;
    } else {
        const newValue = val / 1e9;
        const fixed = roundNum(newValue, precision);
        return shouldrRemoveTrailingZero ? `${removeTrailingZero(fixed)}bn` : `${fixed}bn`;
    }
};
