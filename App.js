import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownList from './app/components/dropDownList/DrowDownList';
import StockList from './app/components/stockList/StockList';
import Constants from 'expo-constants';
// const myStocks = ['SVOL-B.ST'];
// const myKEY = '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa';

const doTheFetch = () => {
  console.log('doThe featch');
  fetch(
    'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol=SVOL-B.ST&interval=5m&range=1d',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa',
      },
    }
  )
    .then((response) => {
      console.log('respone', response);
      response.json().then((dataq) => {
        console.log('respone', dataq);
      });
    })
    .catch((err) => {
      console.log('err');
      console.log(err);
    });
};

const items = [
  {
    value: 'first',
  },
  {
    value: 'second',
  },
  { value: 'third' },
  { value: 'forth' },
  { value: 'fifth' },

  {
    value: 'sixth',
  },
  {
    value: 'seventh',
  },
  { value: 'eigth' },
  { value: 'ninth' },
  { value: 'tenth' },
];

const stocks = [
  {
    name: 'Svolder',
    price: 163,
    today: 3.6,
  },
  {
    name: 'Investor',
    price: 500,
    today: 1.6,
  },
  { name: 'Kinnevik', price: 350, today: 2.1 },
  { name: 'VNV Global', price: 80, today: 1.1 },
  { name: 'Beijer alma', price: 115, today: 0.2 },

  {
    name: 'Nobina',
    price: 55,
    today: 0,
  },
  {
    name: 'Nobia',
    price: 65,
    today: -0.5,
  },
  { name: 'Millicom', price: 255, today: -3.3 },
  { name: 'Note', price: 64, today: -1.0 },
  { name: 'Evolution Gaming', price: 700, today: 1.0 },
];

export default function App() {
  // doTheFetch();
  const onChange = (item) => {
    console.log('OnChange: ', item);
  };
  return (
    <View style={styles.container}>
      <StockList stocks={stocks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    backgroundColor: '#fff',
  },
});
