import { curry } from 'ramda';

export const toFixed = curry((fractionDigits, number) =>
  number.toFixed(fractionDigits)
);
