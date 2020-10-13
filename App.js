import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownList from './app/components/dropDownList/DrowDownList';

// const myStocks = ['SVOL-B.ST'];
// const myKEY = '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa';

// const doTheFetch = () => {
//   fetch(
//     'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?symbol=SVOL-B.ST&interval=5m&range=1d',
//     {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//         'x-rapidapi-key': '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa',
//       },
//     }
//   )
//     .then((response) => {
//       response.text((data) => {
//         console.log(data);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const items = [
  {
    title: 'first',
  },
  {
    title: 'second',
  },
  { title: 'third' },
  { title: 'forth' },
  { title: 'fifth' },

  {
    title: 'sixth',
  },
  {
    title: 'seventh',
  },
  { title: 'eigth' },
  { title: 'ninth' },
  { title: 'tenth' },
];

export default function App() {
  const onChange = (item) => {
    console.log('OnChange: ', item);
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <DropDownList onChange={onChange} items={items}></DropDownList>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
