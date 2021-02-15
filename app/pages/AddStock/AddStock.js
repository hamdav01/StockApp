import { View, Text, Button, TextInput } from 'react-native';
import React from 'react';
import { styles } from './Styles';
import Header from '../../components/header/Header';

const AddStockScreen = ({ navigation }) => {
  const [stockName, onStockNameTextChange] = React.useState(
    'Enter name of stock'
  );
  const [symbol, onSymbolTextChange] = React.useState('Enter symbol of stock');
  return (
    <View style={styles.container}>
      <Header header='Add a stock!' />
      <TextInput
        style={styles.textInput}
        onChangeText={onStockNameTextChange}
        onFocus={() => onStockNameTextChange('')}
        value={stockName}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={onSymbolTextChange}
        onFocus={() => onSymbolTextChange('')}
        value={symbol}
      />
      <Button
        title='Submit'
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', {
            stock: { symbol: symbol, name: stockName },
            //   stock: { symbol: 'VEFL-SDB.ST', name: 'VEF Ltd' },
          });
        }}
      />
    </View>
  );
};

export default AddStockScreen;
