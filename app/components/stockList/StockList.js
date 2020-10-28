import React, { useReducer } from 'react';
import { View, StyleSheet } from 'react-native';

import StockHeaderRow from './StockHeaderRow';
import { createRenderStockRow } from './StockRow';
import { FlatListWrapper } from '../flatListWrapper/FlatListWrapper';
import { stockReducer } from '../../reducers/StockReducer';

const StockList = ({ stocks = [] }) => {
  const [currentStocks, dispatchData] = useReducer(stockReducer, { stocks });
  const renderRow = createRenderStockRow(dispatchData);
  console.log('currentStocks.stocks:', currentStocks.stocks);
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
