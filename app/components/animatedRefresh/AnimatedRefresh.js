import { TouchableOpacity, Animated } from 'react-native';
import React, { useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  getAllSymbolsSelector,
  setStocksAction,
} from '../../reducers/StockReducer';
import { createFromFetchObservablesArray } from '../../utils/Observable';
import { map } from 'rxjs/operators';
import { useState } from 'react';

const AnimatedRefresh = ({ dispatchData, stocks }) => {
  const rotation = useRef(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);
  const interpolateRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const updateStockValues = () => {
    if (!isAnimating) {
      const refreshAnimation = Animated.loop(
        Animated.timing(rotation.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        { iterations: -1 }
      );
      console.log('rotation.current.value: ', rotation);
      refreshAnimation.start();
      setIsAnimating(true);
      createFromFetchObservablesArray(getAllSymbolsSelector(stocks))
        .pipe(map(setStocksAction))
        .subscribe((setStocks) => {
          // const resetAnimation = Animated.timing(rotation, {
          //   toValue: 0,
          //   duration: 1000,
          //   useNativeDriver: true,
          // });
          console.log(' 1000 * rotation.current.value: ', 1000 * rotation);
          console.log('rotation.current.value: ', rotation);
          // resetAnimation.start(() => {
          //   setIsAnimating(false);
          //   refreshAnimation.stop();
          //   rotation.setValue(0);
          //   dispatchData(setStocks);
          // });
        });
    }
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
