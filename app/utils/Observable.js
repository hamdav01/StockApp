import AsyncStorage from '@react-native-community/async-storage';
import { fromFetch } from 'rxjs/fetch';
import { from } from 'rxjs';
import {
  catchError,
  switchMap,
  mergeMap,
  toArray,
  map,
  filter,
  mapTo,
} from 'rxjs/operators';
import { addStockAction, initStocksAction } from '../reducers/StockReducer';

export const getInitStocks = () =>
  getItemAsyncStorage(StorageKeys.STOCKS).pipe(map(initStocksAction));

export const getItemAsyncStorage = (key) =>
  from(AsyncStorage.getItem(key)).pipe(map(JSON.parse));

export const setItemAsyncStorage = (key, value) =>
  from(AsyncStorage.setItem(key, JSON.stringify(value))).pipe(mapTo(value));

export const createFromFetchObservablesArray = (symbolsNames, concurrent = 3) =>
  from(symbolsNames).pipe(
    mergeMap(createFromFetchObservable, concurrent),
    toArray()
  );
export const getOneStock = (stock) =>
  createFromFetchObservable(stock).pipe(map(addStockAction));
  
export const createFromFetchObservable = ({ symbol, name }) =>
  fromFetch(
    `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol=${symbol}&interval=5m&range=1d`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa',
      },
    }
  ).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json().then((result) => {
          if (result.chart.error !== null) {
            return Promise.resolve({
              error: true,
              message: result.chart.error,
            });
          }
          return Promise.resolve({ error: false, name, symbol, ...result });
        });
      }
      return Promise.resolve({
        error: true,
        message: `Error ${response.status}`,
      });
    }),
    catchError((errorMessage) =>
      Promise.resolve({
        error: true,
        message: errorMessage,
      })
    ),
    filter(({ error }) => !error)
  );

export const StorageKeys = {
  STOCKS: 'stocks',
};
