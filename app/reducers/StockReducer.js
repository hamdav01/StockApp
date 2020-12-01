import {
  when,
  is,
  toLower,
  sort,
  ascend,
  equals,
  compose,
  not,
  prop,
  descend,
  reverse,
  multiply,
  subtract,
  divide,
} from 'ramda';
import { toFixed } from '../utils/Functional';

export const StockActions = {
  SORT: 'sort',
  SORT_BY_NAME: 'sortByName',
  INIT: 'init',
};
const isString = is(String);
const lowerCaseString = when(isString, toLower);

const sortReducer = (state, action) => {
  const { sortKey } = action;
  const { activeKey = '', stocks: currentStocks, isDecending = false } = state;
  const isNewSortKey = not(equals(activeKey, sortKey));
  const direction = isNewSortKey ? descend : isDecending ? ascend : descend;
  const sortTheStocks = sort(
    direction(compose(lowerCaseString, prop(sortKey)))
  );
  const newDecendingState = isNewSortKey ? true : !isDecending;
  return {
    stocks: sortTheStocks(currentStocks),
    isDecending: newDecendingState,
    activeKey: sortKey,
  };
};

const convertIntoPercentage = compose(
  toFixed(2),
  multiply(100),
  subtract(1),
  divide
);

export const stockReducer = (state, action) => {
  switch (action.type) {
    case StockActions.INIT: {
      console.log('action.data: ', action.data);
      const stocks = action.data.map((data) => {
        if (data === null) {
          return {
            today: 1,
            price: 1,
            name: 'undefined',
          };
        }
        const {
          previousClose,
          regularMarketPrice,
          symbol,
        } = data.chart.result[0].meta;
        return {
          today: convertIntoPercentage(previousClose, regularMarketPrice),
          price: regularMarketPrice,
          name: symbol,
        };
      });
      return { ...state, stocks };
    }
    case StockActions.SORT: {
      return sortReducer(state, action);
    }
    case StockActions.SORT_BY_NAME: {
      const { stocks, ...rest } = sortReducer(state, action);
      return { ...rest, stocks: reverse(stocks) };
    }
    default:
      throw new Error('No Producer actions exists for this');
  }
};
