import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenName from './ScreenName';
import { TransactionList, DetailTransaction } from '../screens';

export type RootStackParamList = {
  [ScreenName.TRANSACTION_LIST]: undefined;
  [ScreenName.DETAIL_TRANSACTION]: { itemId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenName.TRANSACTION_LIST}>
      <Stack.Screen
        name={ScreenName.TRANSACTION_LIST}
        component={TransactionList}
      />
      <Stack.Screen
        name={ScreenName.DETAIL_TRANSACTION}
        component={DetailTransaction}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
