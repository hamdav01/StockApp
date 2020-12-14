import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { StockActions } from '../../reducers/StockReducer';

const StockHeaderRow = ({ dispatchData }) => {
  const sortByNameCaseInsensitive = () =>
    dispatchData({
      sortKey: 'name',
      type: StockActions.SORT_BY_NAME,
    });

  const sortByTodayPrice = () =>
    dispatchData({
      sortKey: 'today',
      type: StockActions.SORT,
    });
  const sortByPrice = () =>
    dispatchData({
      sortKey: 'price',
      type: StockActions.SORT,
    });

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.rowItemName}
        onPress={sortByNameCaseInsensitive}
      >
        <Text>Name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rowItem} onPress={sortByTodayPrice}>
        <Text>Today</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rowItem} onPress={sortByPrice}>
        <Text>Price</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowItemName: {
    fontWeight: 'bold',
    flex: 0.8,
  },
  rowItem: {
    fontWeight: 'bold',
    flex: 0.1,
    textAlign: 'Right',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 2,
  },
});

export default StockHeaderRow;
