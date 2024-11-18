/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { COLORS } from '../../themes';
import { TransactionDetailProps } from '../../types';
import { Icon } from '../../assets';
import { BankTransferRoute, TransactionRow } from '../../components';

const TransactionDetail = ({
  route: {
    params: { item },
  },
}: TransactionDetailProps) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentStyle}>
      <View style={styles.contentContainer}>
        <View style={styles.containerRow}>
          <Text
            style={[
              styles.textMedium,
              { marginRight: 4 },
            ]}>{`ID TRANSAKSI:#${item.id}`}</Text>
          <Icon.Copy />
        </View>
        <View
          style={[styles.containerRow, { justifyContent: 'space-between' }]}>
          <Text style={styles.textMedium}>DETAIL TRANSAKSI</Text>
          <Text style={[styles.textMedium, { color: COLORS.tomato }]}>
            Tutup
          </Text>
        </View>
        <View style={{ padding: 24 }}>
          <BankTransferRoute
            from={item.sender_bank}
            to={item.beneficiary_bank}
          />
          <TransactionRow
            leftTitle={item.beneficiary_name}
            leftValue={item.account_number}
            rightTitle="NOMINAL"
            rightValue={item.amount}
          />
          <TransactionRow
            leftTitle="BERITA TRANSFER"
            leftValue={item.remark}
            rightTitle="KODE UNIK"
            rightValue={item.unique_code}
          />
          <TransactionRow
            leftTitle="WAKTU DIBUAT"
            leftValue={item.created_at}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.whiteSmoke },
  contentStyle: { flex: 1 },
  contentContainer: {
    backgroundColor: COLORS.white,
    marginTop: 16,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.darkGrey,
  },
  textMedium: { fontWeight: '600' },
  textRegular: { fontWeight: '400' },
  row: { flexDirection: 'row', alignItems: 'center' },
  flex1: { flex: 1 },
});

export default TransactionDetail;
