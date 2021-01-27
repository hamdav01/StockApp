import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StockActions } from '../../reducers/StockReducer';

const StockHeaderRow = ({ filterDispatch }) => {
  const sortByNameCaseInsensitive = () =>
    filterDispatch({
      sortKey: 'name',
      type: StockActions.SORT_BY_NAME,
    });

  const sortByTodayPrice = () =>
    filterDispatch({
      sortKey: 'today',
      type: StockActions.SORT,
    });
  const sortByPrice = () =>
    filterDispatch({
      sortKey: 'price',
      type: StockActions.SORT,
    });

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.rowItemName}
        onPress={sortByNameCaseInsensitive}
      >
        <Text style={styles.text}>Name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rowItem} onPress={sortByTodayPrice}>
        <Text style={styles.text}>Today</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rowItem} onPress={sortByPrice}>
        <Text style={styles.text}>Price</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowItemName: {
    flex: 0.8,
  },
  text: {
    fontWeight: 'bold',
  },
  rowItem: {
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
