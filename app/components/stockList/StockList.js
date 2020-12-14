import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import StockHeaderRow from './StockHeaderRow';
import { createRenderStockRow } from './StockRow';
import { FlatListWrapper } from '../flatListWrapper/FlatListWrapper';
import { StockActions, stockReducer } from '../../reducers/StockReducer';
import {
  getItemAsyncStorage,
  createFromFetchObservable,
  createFromFetchObservables,
  setItemAsyncStorage,
} from '../../utils/Observable';

const mySymbols = [
  {
    symbol: 'SVOL-B.ST',
    name: 'Svolder',
  },
  {
    symbol: 'BEIA-B.ST',
    name: 'Beijer alma',
  },
  {
    symbol: 'KIND-SDB.ST',
    name: 'Kindred',
  },
  {
    symbol: 'KINV-B.ST',
    name: 'Kinnevik',
  },
  {
    symbol: 'VNV.ST',
    name: 'VnV Global',
  },
  {
    symbol: 'VEMF-SDB.ST',
    name: 'Vostok Emerging Finance',
  },
  {
    symbol: 'EVO.ST',
    name: 'Evolution Gaming',
  },
  {
    symbol: 'STE-R.ST',
    name: 'Stora Enso',
  },
  {
    symbol: 'BETCO.ST',
    name: 'Better Collective',
  },
  {
    symbol: 'NOBI.ST',
    name: 'Nobia',
  },
  {
    symbol: 'NOBINA.ST',
    name: 'Nobina',
  },
  {
    symbol: 'NOTE.ST',
    name: 'NOTE',
  },
  {
    symbol: 'VNE-SDB.ST',
    name: 'Veoneer',
  },
  {
    symbol: 'INVE-B.ST',
    name: 'Investor',
  },
];

const useAsynchStorage = () => {
  const [currentStocks, dispatchData] = useReducer(stockReducer, {
    stocks: [],
  });
  useEffect(() => {
    const getData = () => {
      getItemAsyncStorage('stocks').subscribe({
        next: (data) => {
          console.log('data: ', data);
          dispatchData({ type: StockActions.INIT, data });
        },
      });
      // createFromFetchObservables('@stock_keys').subscribe({
      //   next: (data) => {
      //     dispatchData({ type: StockActions.INIT, data });
      //   },
      //   dispatchData({ type: StockActions.INIT, data: incdata }),
      //   complete: () => {
      //       setItemAsyncStorage('stocks', data).subscribe();
      //   },
      //     //  dispatchData({ type: StockActions.INIT, data }),
      // });
    };
    getData();
  }, []);

  return [currentStocks, dispatchData];
};

const StockList = () => {
  const [currentStocks, dispatchData] = useAsynchStorage();
  const renderRow = createRenderStockRow(dispatchData);
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
