import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const myKEY = '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa';

export default function App() {
  // fetch(
  //   'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=tesla',
  //   {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
  //       'x-rapidapi-key': '0e9d6faee7msha19b9b9ffebf94fp1551d4jsn34f915bc0afa',
  //     },
  //   }
  // )
  //   .then((response) => {
  //     console.log(response.json());
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
