import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Header from '../components/header/Header';
import StockList from '../components/stockList/StockList';
import { Ionicons } from '@expo/vector-icons';
export default function Home() {
  return (
    <View style={styles.content}>
      <View style={styles.stockListArea}>
        <Header header={'StockList'} />
        <StockList />
      </View>
      <View style={styles.buttonArea}>
        <TouchableWithoutFeedback
          style={styles.button}
          size={120}
          onPress={() => {
            console.log('pressed ');
          }}
        >
          <Ionicons name='ios-add-circle-outline' size={120} color='black' />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.button}
          size={120}
          onPress={() => {
            console.log('pressed ');
          }}
        >
          <Ionicons name='ios-remove-circle-outline' size={120} color='black' />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {},
  stockListArea: {
    flex: 0.8,
  },
  button: { flex: 0.2 },
  buttonArea: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
