import { cond, __, always, append } from 'ramda';
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

const addPercentageSign = append(' %');
const PriceStockRowItem = ({ today }) => {
  const todayString = String(today);
  const colorStyle = getColor(todayString);
  return (
    <Text style={[styles[colorStyle], styles.rowItemAlignLeft]}>
      {addPercentageSign(todayString)}
    </Text>
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
    flex: 0.75,
  },
  rowItemAlignLeft: {
    flex: 0.25,
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
    textAlign: 'right',
    flexDirection: 'row',
    display: 'flex',
  },
});
