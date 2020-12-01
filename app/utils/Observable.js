import AsyncStorage from '@react-native-community/async-storage';
import { fromFetch } from 'rxjs/fetch';
import { of, Observable, from, merge } from 'rxjs';
import { catchError, switchMap, mergeMap, map } from 'rxjs/operators';

export const getItemAsyncStorage = (key) => {
  return new Observable((subscriber) => {
    AsyncStorage.getItem(key).then((value) => {
      subscriber.next(JSON.parse(value));
      subscriber.complete();
    });
  });
};

// export const createFromFetchObservables = (symbols, concurrent = 4) =>
//   from(symbols).pipe(mergeMap(createFromFetchObservable, concurrent));

export const createFromFetchObservables = (key, concurrent = 4) =>
  getItemAsyncStorage(key).pipe(
    map((symbols) => symbols.map(({ symbol }) => symbol)),
    mergeMap(from),
    mergeMap(createFromFetchObservable, concurrent)
  );

export const setItemAsyncStorage = (key, value) => {
  return new Observable((subscriber) => {
    AsyncStorage.setItem(key, JSON.stringify(value)).then((result) => {
      subscriber.next(result);
      subscriber.complete();
    });
  });
};

export const createFromFetchObservable = (symbol) =>
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
        // OK return data
        return response.json();
      } else {
        // Server is returning a status requiring the client to try something else.
        return of({ error: true, message: `Error ${response.status}` });
      }
    }),
    catchError((err) => {
      return of({ error: true, message: err.message });
    })
  );
