import camelCase from 'camelcase';

import { reservedWords } from '../../../utils/reservedWords';

const CHAR_REPLACEMENTS = {
    ">": "gt",
    "<": "lt",
} as const;

/**
 * Replaces any invalid characters from a parameter name.
 * For example: 'filter.someProperty' becomes 'filterSomeProperty'.
 */
export const getOperationParameterName = (value: string): string => {
    let clean = value;
    for (const entry of Object.entries(CHAR_REPLACEMENTS)) {
        const [key, value] = entry;
        clean = clean.replace(new RegExp(`^${key}$`, 'g'), value);
        clean = clean.replace(new RegExp(`^${key}`, 'g'), `${value}-`);
        clean = clean.replace(new RegExp(`${key}$`, 'g'), `-${value}`);
        clean = clean.replace(new RegExp(key, 'g'), `-${value}-`);
    }

    clean = clean
        .replace(/^[^a-zA-Z]+/g, '')
        .replace('[]', 'Array')
        .replace(/[^\w\-]+/g, '-')
        .trim();
    return camelCase(clean).replace(reservedWords, '_$1');
};
