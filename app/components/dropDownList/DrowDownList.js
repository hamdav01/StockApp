import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { head } from 'ramda';
import { createRenderDropDownItem, DropDownItem } from './DropDownListItem';
import { FlatListWrapper } from '../flatListWrapper/FlatListWrapper';

export default function DropDownList({ items, onChange }) {
  const [isExpanded, setExpanded] = useState(true);
  const [item, setActiveItem] = useState(head(items));

  const content = isExpanded
    ? DropDownListExpanded({ setExpanded, setActiveItem, onChange, items })
    : DropDownListNotExpanded({ setExpanded, value: item.value });

  return content;
}

const DropDownListNotExpanded = ({ value, setExpanded }) => (
  <View style={styles.container}>
    <DropDownItem value={value} onPress={() => setExpanded(true)} />
  </View>
);

const DropDownListExpanded = ({
  items,
  onChange,
  setActiveItem,
  setExpanded,
}) => {
  const onPress = (activeItem) => {
    setExpanded(false);
    setActiveItem(activeItem);
    onChange(activeItem);
  };
  return (
    <View style={styles.containerExpanded}>
      <FlatListWrapper
        data={items}
        renderItem={createRenderDropDownItem(onPress)}
      />
    </View>
  );
};

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
