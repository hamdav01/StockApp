import { View } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import Header from '../../components/header/Header';
import StockList from '../../components/stockList/StockList';
import { stockReducer } from '../../reducers/StockReducer';
import {
  getOneStock,
  getInitStocks,
  setItemAsyncStorage,
  StorageKeys,
} from '../../utils/Observable';
import { styles } from './Styles';
import AnimatedRefresh from '../../components/animatedRefresh/AnimatedRefresh';

const useAsynchStorage = () => {
  const [currentStocks, dispatchData] = useReducer(stockReducer, {
    stocks: [],
  });
  useEffect(() => getInitStocks().subscribe(dispatchData), []);

  useEffect(() => {
    if (currentStocks?.stocks?.length > 0) {
      setItemAsyncStorage(StorageKeys.STOCKS, currentStocks.stocks).subscribe();
    }
  }, [currentStocks]);
  return [currentStocks, dispatchData];
};

export default function HomeScreen({ route }) {
  const [currentStocks, dispatchData] = useAsynchStorage();

  useEffect(() => {
    const stock = route.params?.stock;
    if (stock !== undefined) {
      getOneStock(stock).subscribe(dispatchData);
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
