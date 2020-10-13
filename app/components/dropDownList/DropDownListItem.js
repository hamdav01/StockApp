import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import React from 'react';

export const DropDownItem = ({ title, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableHighlight>
);
export const createRenderDropDownItem = (onPress) => ({ item }) => (
  <DropDownItem onPress={() => onPress(item)} title={item.title} />
);

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#E8E8E8',
  },
  title: {
    fontSize: 20,
  },
});
