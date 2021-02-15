import { modulo, __, equals, gt, lt, compose, not } from 'ramda';
export const isOdd = modulo(__, 2);
export const isLessThanZero = lt(__, 0);
export const isZero = equals(0);
export const isGreaterThanZero = gt(__, 0);
export const isNumber = compose(not, isNaN);
