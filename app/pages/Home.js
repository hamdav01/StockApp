import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import React, { useEffect, useReducer, useRef } from 'react';
import Header from '../components/header/Header';
import StockList from '../components/stockList/StockList';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {
  StockActions,
  stockReducer,
  setStocksAction,
} from '../reducers/StockReducer';
import {
  createFromFetchObservables,
  getItemAsyncStorage,
} from '../utils/Observable';
import { map } from 'rxjs/operators';

const AsyncKeys = {
  STOCKS: 'stocks',
  STOCK_KEYS: '@stock_keys',
};

const useAsynchStorage = () => {
  const [currentStocks, dispatchData] = useReducer(stockReducer, {
    stocks: [],
  });
  useEffect(() => {
    getItemAsyncStorage(AsyncKeys.STOCKS)
      .pipe(map(setStocksAction))
      .subscribe(dispatchData);
  }, []);
  return [currentStocks, dispatchData];
};

export default function Home() {
  const [currentStocks, dispatchData] = useAsynchStorage();
  const rotation = useRef(new Animated.Value(0)).current;
  const interpolateRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  interpolateRotation.addListener((data) => {
    console.log('data', data);
  });
  const test = () => {
    //createFromFetchObservables(AsyncKeys.STOCK_KEYS).subscribe((data) => {
    //console.log('data:', data);
    // dispatchData({ type: StockActions.INIT, data });
    // });
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
  };
  return (
    <View>
      <View style={styles.stockListArea}>
        <View style={styles.header}>
          <Header header={'StockList'} />
          <Animated.View
            style={{
              transform: [
                {
                  rotate: interpolateRotation,
                },
              ],
            }}
          >
            <TouchableOpacity onPress={test}>
              <FontAwesome name='refresh' size={32} color='black' />
            </TouchableOpacity>
          </Animated.View>
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
        <TouchableWithoutFeedback
          size={120}
          onPress={() => {
            console.log('pressed ');
          }}
        >
          <Ionicons name='ios-remove-circle-outline' size={120} color='black' />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockListArea: {
    flex: 0.8,
  },
  buttonArea: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

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
