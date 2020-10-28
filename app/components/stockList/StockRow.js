import { cond, __, always } from 'ramda';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  isGreaterThanZero,
  isLessThanZero,
  isOdd,
  isZero,
} from '../../utils/Checks';

export const createRenderStockRow = () => ({
  item: { name, price, today },
  index,
}) => <StockRow today={today} price={price} name={name} isOdd={isOdd(index)} />;

const getColor = cond([
  [isLessThanZero, always('red')],
  [isZero, always('black')],
  [isGreaterThanZero, always('green')],
]);

const PriceStockRowItem = ({ today }) => {
  const colorStyle = getColor(today);
  return (
    <Text style={[styles[colorStyle], styles.rowItemAlignLeft]}>{today}</Text>
  );
};

const StockRow = ({ name, today, price, isOdd }) => {
  const styleForRow = isOdd ? styles.row : [styles.row, styles.rowEven];
  return (
    <View style={styleForRow}>
      <Text style={styles.rowItem}>{name}</Text>
      <PriceStockRowItem today={today} />
      <Text style={styles.rowItemAlignLeft}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    flex: 0.8,
  },
  rowItemAlignLeft: {
    flex: 0.1,
    textAlign: 'right',
  },
  red: {
    color: 'red',
  },
  black: {
    color: 'black',
  },
  green: {
    color: 'green',
  },
  rowEven: {
    backgroundColor: '#f4f4f4',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});
