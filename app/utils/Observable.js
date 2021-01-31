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
} from 'rxjs/operators';

export const getItemAsyncStorage = (key) =>
  from(AsyncStorage.getItem(key)).pipe(map(JSON.parse));

export const createFromFetchObservables = (key, concurrent = 3) =>
  getItemAsyncStorage(key).pipe(
    mergeMap(from),
    mergeMap(createFromFetchObservable, concurrent),
    toArray()
  );

export const setItemAsyncStorage = (key, value) =>
  from(AsyncStorage.setItem(key, JSON.stringify(value)));

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
          return Promise.resolve({ error: false, name, ...result });
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
  STOCK_KEYS: '@stock_keys',
};
