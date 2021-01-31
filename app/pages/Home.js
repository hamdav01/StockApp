import { View, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import Header from '../components/header/Header';
import StockList from '../components/stockList/StockList';
import { Ionicons } from '@expo/vector-icons';
import { stockReducer, setStocksAction } from '../reducers/StockReducer';
import { getItemAsyncStorage, StorageKeys } from '../utils/Observable';
import { map } from 'rxjs/operators';
import { styles } from './Styles';
import AnimatedRefresh from '../components/animatedRefresh/AnimatedRefresh';

const useAsynchStorage = () => {
  const [currentStocks, dispatchData] = useReducer(stockReducer, {
    stocks: [],
  });
  useEffect(() => {
    getItemAsyncStorage(StorageKeys.STOCKS)
      .pipe(map(setStocksAction))
      .subscribe();
  }, []);
  return [currentStocks, dispatchData];
};

export default function Home() {
  const [currentStocks, dispatchData] = useAsynchStorage();
  return (
    <View>
      <View style={styles.stockListArea}>
        <View style={styles.header}>
          <Header header={'StockList'} />
          <AnimatedRefresh dispatchData={dispatchData} />
        </View>
        <StockList
          stocks={currentStocks.stocks}
          filterDispatch={dispatchData}
        />
      </View>
      <View style={styles.buttonArea}>
        <TouchableWithoutFeedback
          size={120}
          onPress={() => {
            console.log('pressed ');
          }}
        >
          <Ionicons name='ios-add-circle-outline' size={120} color='black' />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

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
    symbol: 'VEMF-SDB.ST', //TODO: Something else
    name: 'Vostok Emerging Finance',
  },
  {
    symbol: 'EVO.ST',
    name: 'Evolution Gaming',
  },
  {
    symbol: 'BETCO.ST',
    name: 'Better Collective',
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
