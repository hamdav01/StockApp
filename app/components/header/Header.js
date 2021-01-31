import { Text, View } from 'react-native';
import React from 'react';
import { styles } from './Styles';

const Header = ({ header }) => {
  return (
    <View>
      <Text style={styles.header}>{header}</Text>
    </View>
  );
};

export default Header;
