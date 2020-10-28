import { modulo, __, equals, gt, lt } from 'ramda';
export const isOdd = modulo(__, 2);
export const isLessThanZero = lt(__, 0);
export const isZero = equals(0);
export const isGreaterThanZero = gt(__, 0);
