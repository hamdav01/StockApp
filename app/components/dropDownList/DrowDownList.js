import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import shortid from 'shortid';
import { head } from 'ramda';
import { createRenderDropDownItem, DropDownItem } from './DropDownListItem';

export default function DropDownList({ items, onChange }) {
  const [isExpanded, setExpanded] = useState(false);
  const [value, setValue] = useState(head(items));
  const onPress = (item) => {
    setValue(item);
    setExpanded(false);
    onChange(item);
  };
  const content = isExpanded ? (
    <FlatList
      data={items}
      renderItem={createRenderDropDownItem(onPress)}
      keyExtractor={shortid.generate}
    />
  ) : (
    <DropDownItem title={value.title} onPress={() => setExpanded(true)} />
  );

  return (
    <View style={isExpanded ? styles.containerExpanded : styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  containerExpanded: {
    height: 170,
    width: 120,
  },
  container: {
    height: 170,
    width: 120,
  },
});
