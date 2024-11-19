import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../assets';
import { BankTransferRouteProps } from '../../types';

const BankTransferRoute = ({
  from = '-',
  to = '-',
}: BankTransferRouteProps) => (
  <React.Fragment>
    <View style={styles.row}>
      <Text style={styles.textBold}>{from}</Text>
      <Icon.ArrowRight />
      <Text style={styles.textBold}>{to}</Text>
    </View>
  </React.Fragment>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  textBold: { fontWeight: 'bold' },
});

export default memo(BankTransferRoute);
