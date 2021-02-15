import { View } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import Header from '../../components/header/Header';
import StockList from '../../components/stockList/StockList';
import {
  stockReducer,
  setStocksAction,
  addStockAction,
} from '../../reducers/StockReducer';
import {
  createFromFetchObservable,
  getItemAsyncStorage,
  StorageKeys,
} from '../../utils/Observable';
import { map } from 'rxjs/operators';
import { styles } from './Styles';
import AnimatedRefresh from '../../components/animatedRefresh/AnimatedRefresh';

const useAsynchStorage = () => {
  const [currentStocks, dispatchData] = useReducer(stockReducer, {
    stocks: [],
  });
  useEffect(() => {
    getItemAsyncStorage(StorageKeys.STOCKS)
      .pipe(map(setStocksAction))
      .subscribe(dispatchData);
  }, []);

  return [currentStocks, dispatchData];
};

export default function HomeScreen({ route }) {
  const [currentStocks, dispatchData] = useAsynchStorage();

  React.useEffect(() => {
    const stock = route.params?.stock;
    if (stock !== undefined) {
      createFromFetchObservable(stock).subscribe((data) => {
        console.log('add stock now', stock);
        dispatchData(addStockAction(data));
        //  setItemAsyncStorage(StorageKeys.STOCKS, data);
      });
    }
  }, [route.params?.stock]);
  return (
    <View style={styles.container}>
      <View style={styles.stockListArea}>
        <View style={styles.header}>
          <Header header={'StockList'} />
          <AnimatedRefresh dispatchData={dispatchData} stocks={currentStocks} />
        </View>
        <StockList
          stocks={currentStocks.stocks}
          filterDispatch={dispatchData}
        />
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
    symbol: '', //TODO: Something else
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
