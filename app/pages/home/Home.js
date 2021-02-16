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
  createFromFetchObservableSave,
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
      createFromFetchObservableSave(stock)
        .pipe(map(addStockAction))
        .subscribe(dispatchData);
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
