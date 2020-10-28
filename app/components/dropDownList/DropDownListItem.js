import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { curry } from 'ramda';
import React from 'react';

export const DropDownItem = ({ value, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </TouchableHighlight>
);
export const createRenderDropDownItem = curry((onPress, { item }) => {
  console.log('item: ', item);
  return <DropDownItem onPress={() => onPress(item)} value={item.value} />;
});

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#E8E8E8',
  },
  value: {
    fontSize: 20,
  },
});
