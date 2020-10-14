import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownList from './app/components/dropDownList/DrowDownList';


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
