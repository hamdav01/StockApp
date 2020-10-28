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
  ifElse,
  identity,
  reverse,
} from 'ramda';

export const StockActions = {
  SORT: 'sort',
  SORT_BY_NAME: 'sortByName',
};
const isString = is(String);
const lowerString = when(isString, toLower);

const sortReducer = (state, action) => {
  const { sortKey } = action;
  const { activeKey = '', stocks: currentStocks, isDecending = false } = state;
  const isNewSortKey = not(equals(activeKey, sortKey));
  const direction = isNewSortKey ? descend : isDecending ? ascend : descend;
  const sortTheStocks = sort(direction(compose(lowerString, prop(sortKey))));
  const newDecendingState = isNewSortKey ? true : !isDecending;
  return {
    stocks: sortTheStocks(currentStocks),
    isDecending: newDecendingState,
    activeKey: sortKey,
  };
};

export const stockReducer = (state, action) => {
  switch (action.type) {
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
