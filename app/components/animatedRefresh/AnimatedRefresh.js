import { TouchableOpacity, Animated } from 'react-native';
import React, { useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  getAllSymbolsSelector,
  setStocksAction,
} from '../../reducers/StockReducer';
import { createFromFetchObservablesArray } from '../../utils/Observable';
import { map } from 'rxjs/operators';

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
    createFromFetchObservablesArray(getAllSymbolsSelector(stocks))
      .pipe(map(setStocksAction))
      .subscribe((setStocks) => {
        refreshAnimation.stop();
        dispatchData(setStocks);
      });
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
