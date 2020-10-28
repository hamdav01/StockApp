import { FlatList } from 'react-native';
import React from 'react';
import shortid from 'shortid';

export const FlatListWrapper = (props) => (
  <FlatList {...props} keyExtractor={shortid.generate} />
);
