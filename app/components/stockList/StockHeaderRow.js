import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { compose, sort, prop, toLower, ascend, descend } from 'ramda';
import { StockActions } from '../../reducers/StockReducer';

const StockHeaderRowItem = ({ type, dispatchData }) => {
  // const [decend, setDecend] = useState(ascend);
  // const [active, setActive] = useState(false);
  // const sortByNumber = () => {
  //   const sortingFunction = active ? descend : ascend;
  //   dispatchData({
  //     sort: compose(ascend, prop(type)),
  //     type: StockActions.sort,
  //   });
  //   setActive(true);
  // };

  return (
    <TouchableHighlight style={styles.rowItem2} onPress={sortByNumber}>
      <Text>Today</Text>
    </TouchableHighlight>
  );
};

const StockHeaderRow = ({ dispatchData }) => {
  // const [sorting, setSortingState] = useState(false)

  const sortByNameCaseInsensitive = () =>
    dispatchData({
      sortKey: 'name',
      type: StockActions.SORT_BY_NAME,
    });

  const sortByNumber = () =>
    dispatchData({
      sortKey: 'today',
      type: StockActions.SORT,
    });
  const sortByNumber2 = () =>
    dispatchData({
      sortKey: 'price',
      type: StockActions.SORT,
    });

  return (
    <View style={styles.row}>
      <TouchableHighlight
        style={styles.rowItemName}
        onPress={sortByNameCaseInsensitive}
      >
        <Text>Name</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.rowItem} onPress={sortByNumber}>
        <Text>Today</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.rowItem} onPress={sortByNumber2}>
        <Text>price</Text>
      </TouchableHighlight>
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
