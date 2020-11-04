import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import StockHeaderRow from './StockHeaderRow';
import { createRenderStockRow } from './StockRow';
import { FlatListWrapper } from '../flatListWrapper/FlatListWrapper';
import { stockReducer } from '../../reducers/StockReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { andThen, compose, map, take } from 'ramda';
import {
  getItemAsyncStorage,
  createFromFetchObservable,
} from '../../utils/Observable';

// const mySymbols = [
//   {
//     symbol: 'SVOL-B.ST',
//     name: 'Svolder',
//   },
//   {
//     symbol: 'BEIA-B.ST',
//     name: 'Beijer alma',
//   },
//   {
//     symbol: 'KIND-SDB.ST',
//     name: 'Kindred',
//   },
//   {
//     symbol: 'KINV-B.ST',
//     name: 'Kinnevik',
//   },
//   {
//     symbol: 'VNV.ST',
//     name: 'VnV Global',
//   },
//   {
//     symbol: 'VEMF-SDB.ST',
//     name: 'Vostok Emerging Finance',
//   },
//   {
//     symbol: 'EVO.ST',
//     name: 'Evolution Gaming',
//   },
//   {
//     symbol: 'STE-R.ST',
//     name: 'Stora Enso',
//   },
//   {
//     symbol: 'BETCO.ST',
//     name: 'Better Collective',
//   },
//   {
//     symbol: 'NOBI.ST',
//     name: 'Nobia',
//   },
//   {
//     symbol: 'NOBINA.ST',
//     name: 'Nobina',
//   },
//   {
//     symbol: 'NOTE.ST',
//     name: 'NOTE',
//   },
//   {
//     symbol: 'VNE-SDB.ST',
//     name: 'Veoneer',
//   },
//   {
//     symbol: 'INVE-B.ST',
//     name: 'Investor',
//   },
// ];

// const fetchStock = (symbol) => {
//   return fetch(
//     `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol=SVOL-B.ST&interval=5m&range=1d`,
//     {
//       method: 'GET',
//       headers: {
//         'access-control-allow-credentials': 'true',
//         'access-control-allow-headers': 'ver',
//         'access-control-allow-methods': 'GET, POST',
//         'access-control-allow-origin': '*',
//         'content-type': 'application/json',
//         'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//         'x-rapidapi-key': '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa',
//       },
//     }
//   ).then((response) => {
//     response.json().then((re) => {
//       console.log('response: ', re);
//     });
//   });
// };

// const parseFetch = compose(map(fetchStock), JSON.parse);

// const myTest = async (dispatchData) => {
//   const keys = await AsyncStorage.getItem('@stock_keys');
//   const parsedKeys = JSON.parse(keys);
//   return Promise.all(
//     take(1, parsedKeys).map(({ symbol, name }) => {
//       return fetchStock(symbol).then((response) => {
//         console.log('name: ', name);
//         console.log('response: ', response);
//         return response.json(() => {
//           return AsyncStorage.setItem(name, JSON.stringify(response)).then(
//             () => {
//               return Promise.resolve(response);
//             }
//           );
//         });
//       });
//     })
//   ).then((data) => {
//     console.log('data: ', data);
//     //  dispatchData({ type: StockActions.INIT, data });
//   });
// };

const getAndParseItem = compose(andThen(JSON.parse), AsyncStorage.getItem);
const mapGetAndParseItem = map(getAndParseItem);

const useAsynchStorage = () => {
  const [currentStocks, dispatchData] = useReducer(stockReducer, {
    stocks: [],
  });
  useEffect(() => {
    const getData = async () => {
      const keys = await AsyncStorage.getItem('@stock_keys');
      const parsedKeys = JSON.parse(keys);
      const myTestKeys = parsedKeys.map(({ name }) => name);
      console.log('keys: ', take(3, myTestKeys));
      const t = await AsyncStorage.getItem('Kindred');
      console.log('keys: ', t);
      //  const data = await Promise.all(mapGetAndParseItem(take(3, myTestKeys)));
      //  dispatchData({ type: StockActions.INIT, data });
    };
    getData();
  }, []);

  return [currentStocks, dispatchData];
};

const addValue = async () => {
  try {
    await AsyncStorage.setItem('@stock_keys', JSON.stringify(mySymbols));
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};
//

const StockList = () => {
  const [currentStocks, dispatchData] = useAsynchStorage();
  const renderRow = createRenderStockRow(dispatchData);
  // addValue();
  // fetchStock();
  createFromFetchObservable().subscribe({
    next: (result) => console.log(result),
    complete: () => console.log('done'),
  });
  // getItemAsyncStorage('@stock_keys').subscribe({
  //   next(x) {
  //     console.log('got value ' + x);
  //   },
  //   error(err) {
  //     console.error('something wrong occurred: ' + err);
  //   },
  //   complete() {
  //     console.log('done');
  //   },
  // });
  return (
    <View style={styles.content}>
      <StockHeaderRow dispatchData={dispatchData} />
      <FlatListWrapper data={currentStocks.stocks} renderItem={renderRow} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
  },
});

export default StockList;
