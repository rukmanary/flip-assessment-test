import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenName from './ScreenName';
import { TransactionList, DetailTransaction } from '../screens';
import { DetailTransactionData } from '../types';

export type RootStackParamList = {
  [ScreenName.TRANSACTION_LIST]: undefined;
  [ScreenName.DETAIL_TRANSACTION]: { item: DetailTransactionData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenName.TRANSACTION_LIST}>
      <Stack.Screen
        name={ScreenName.TRANSACTION_LIST}
        component={TransactionList}
        options={{ title: 'Transaction History' }}
      />
      <Stack.Screen
        name={ScreenName.DETAIL_TRANSACTION}
        component={DetailTransaction}
        options={{ title: 'Transaction Detail' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
