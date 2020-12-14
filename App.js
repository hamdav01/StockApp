import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './app/pages/Home';
export default function App() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    backgroundColor: '#fff',
  },
});
