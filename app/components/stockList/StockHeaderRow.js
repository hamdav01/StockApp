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
    flex: 0.75,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowItem: {
    flex: 0.25,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
    borderBottomWidth: 2,
  },
});

export default StockHeaderRow;
