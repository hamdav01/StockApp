import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = ({ header }) => {
  return (
    <View>
      <Text style={styles.header}>{header}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
});

export default Header;
