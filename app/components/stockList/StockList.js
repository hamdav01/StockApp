import React from 'react';
import { View, StyleSheet } from 'react-native';

import StockHeaderRow from './StockHeaderRow';
import { createRenderStockRow } from './StockRow';
import { FlatListWrapper } from '../flatListWrapper/FlatListWrapper';

const StockList = ({ stocks, filterDispatch }) => {
  const renderRow = createRenderStockRow(filterDispatch);
  return (
    <View style={styles.content}>
      <StockHeaderRow filterDispatch={filterDispatch} />
      <FlatListWrapper data={stocks} renderItem={renderRow} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
  },
});

export default StockList;
