import { View, Text, Button } from 'react-native';
import React from 'react';

const AddStockScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button
        title='Done'
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', {
            stock: { symbol: 'VEFL-SDB.ST', name: 'VEF Ltd' },
          });
        }}
      />
    </View>
  );
};

export default AddStockScreen;
