import { TouchableOpacity, Animated } from 'react-native';
import React, { useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  getAllSymbolsSelector,
  setStocksAction,
} from '../../reducers/StockReducer';
import {
  createFromFetchObservablesArray,
  setItemAsyncStorage,
} from '../../utils/Observable';
import { StorageKeys } from '../../utils/Observable';

const AnimatedRefresh = ({ dispatchData, stocks }) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const interpolateRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const updateStockValues = () => {
    const refreshAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true, // To make use of native driver for performance
        }),
      ])
    );
    refreshAnimation.start();
    createFromFetchObservablesArray(getAllSymbolsSelector(stocks)).subscribe(
      (data) => {
        refreshAnimation.stop();
        dispatchData(setStocksAction(data));
        console.log('data: ', data);
        //    setItemAsyncStorage(StorageKeys.STOCKS, data).subscribe();
      }
    );
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: interpolateRotation,
          },
        ],
      }}
    >
      <TouchableOpacity onPress={updateStockValues}>
        <FontAwesome name='refresh' size={32} color='black' />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedRefresh;
