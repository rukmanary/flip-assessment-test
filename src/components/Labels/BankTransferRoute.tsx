import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon } from '../../assets';
import { BankTransferRouteProps } from '../../types';

const BankTransferRoute = ({ from, to }: BankTransferRouteProps) => (
  <React.Fragment>
    <View style={styles.row}>
      <Text style={styles.textBold}>{from || '-'}</Text>
      <Icon.ArrowRight />
      <Text style={styles.textBold}>{to || '-'}</Text>
    </View>
  </React.Fragment>
);

export default BankTransferRoute;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  textBold: { fontWeight: 'bold' },
});
