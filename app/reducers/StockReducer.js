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
  SET: 'set',
};
const isString = is(String);
const lowerCaseString = when(isString, toLower);

const sortReducer = (state, action) => {
  const { sortKey } = action;
  const { activeKey = '', stocks: currentStocks, isDecending = false } = state;
  const isNewSortKey = not(equals(activeKey, sortKey));
  const direction = isNewSortKey ? descend : isDecending ? ascend : descend;
  console.log(currentStocks);
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
  Number,
  toFixed(2),
  multiply(100),
  subtract(1),
  divide
);

export const setStocksAction = (stocks) => ({
  type: StockActions.SET,
  data: stocks,
});

export const stockReducer = (state, action) => {
  switch (action.type) {
    case StockActions.SET: {
      console.log('data: ', action.data);
      const data = action.data || [];
      const stocks = data.flatMap((data) => {
        const { chart, name } = data;
        if (chart.error !== null) {
          return [];
        }
        const { previousClose, regularMarketPrice } = chart.result[0].meta;
        return {
          name,
          today: convertIntoPercentage(previousClose, regularMarketPrice),
          price: regularMarketPrice,
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
