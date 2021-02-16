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
  map,
  pick,
  any,
} from 'ramda';
import { isNumber } from '../utils/Checks';
import { toFixed } from '../utils/Functional';

export const StockActions = {
  SORT: 'sort',
  SORT_BY_NAME: 'sortByName',
  SET: 'set',
  ADD: 'add',
  DELETE: 'delete',
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

export const initStocksAction = (stocks) => ({
  type: StockActions.INIT,
  data: stocks,
});

export const addStockAction = (stock) => ({
  type: StockActions.ADD,
  data: stock,
});

export const deleteStockAction = (stock) => ({
  type: StockActions.DELETE,
  data: stock,
});

const getGetStockInformation = ({ chart, name }) => {
  if (chart.error !== null) {
    return [];
  }
  const { previousClose, regularMarketPrice, symbol } = chart.result[0].meta;
  const validate = isNumber(previousClose) && isNumber(regularMarketPrice);
  if (!validate) {
    return [];
  }
  return [
    {
      name,
      symbol,
      today: convertIntoPercentage(previousClose, regularMarketPrice),
      price: regularMarketPrice,
    },
  ];
};

export const getAllSymbolsSelector = compose(
  map(pick(['symbol', 'name'])),
  prop('stocks')
);

export const stockReducer = (state, action) => {
  switch (action.type) {
    case StockActions.INIT: {
      const data = action.data || [];
      return { ...state, stocks: data };
    }
    case StockActions.SET: {
      const data = action.data || [];
      const stocks = data.flatMap(getGetStockInformation);
      return { ...state, stocks };
    }
    case StockActions.ADD: {
      const [stock] = getGetStockInformation(action.data);
      if (stock !== undefined) {
        const stockExists = any(
          compose(equals(stock.symbol), prop('symbol')),
          state.stocks
        );
        if (stockExists) {
          return state;
        }
        return {
          ...state,
          stocks: [...state.stocks, stock],
        };
      }
      return state;
    }
    case StockActions.DELETE: {
      return {
        ...state,
        stocks: filter(compose(not, equals(action.data), prop('name'))),
      };
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
