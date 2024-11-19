/* eslint-disable react-native/no-inline-styles */
import React, { memo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../themes';
import { TransactionDetailProps } from '../../types';
import { Icon } from '../../assets';
import { BankTransferRoute, TransactionRow } from '../../components';
import { useNavigation } from '../../hooks';
import { copyToClipboard } from '../../helpers';
import { Snackbar } from 'react-native-paper';

const TransactionDetail = ({
  route: {
    params: { item },
  },
}: TransactionDetailProps) => {
  const { navigation } = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const _copyTransactionID = useCallback(() => {
    copyToClipboard(item.id);
    setVisible(true);
  }, [item.id]);

  const _handleCloseSnackbar = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentStyle}>
      <View style={styles.contentContainer}>
        {/* ID Transaction Section */}
        <View style={styles.containerRow}>
          <Text
            style={[
              styles.textMedium,
              { marginRight: 4 },
            ]}>{`ID TRANSAKSI:#${item.id}`}</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={_copyTransactionID}>
            <Icon.Copy />
          </TouchableOpacity>
        </View>

        {/* Detail Transaksi Section */}
        <View
          style={[styles.containerRow, { justifyContent: 'space-between' }]}>
          <Text style={styles.textMedium}>DETAIL TRANSAKSI</Text>
          <Text
            onPress={navigation.goBack}
            style={[styles.textMedium, { color: COLORS.tomato }]}>
            Tutup
          </Text>
        </View>

        {/* Transaction Details */}
        <View style={styles.detailContainer}>
          <View style={styles.rowMargin}>
            <BankTransferRoute
              from={item.sender_bank}
              to={item.beneficiary_bank}
            />
          </View>
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

      {/* Snackbar */}
      <Snackbar
        visible={visible}
        onDismiss={_handleCloseSnackbar}
        duration={1000}>
        Id transaksi berhasil disalin
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.whiteSmoke },
  contentStyle: { flex: 1 },
  contentContainer: { backgroundColor: COLORS.white, marginTop: 16 },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.darkGrey,
  },
  textMedium: { fontWeight: '600' },
  textRegular: { fontWeight: '400' },
  detailContainer: { padding: 16 },
  rowMargin: { marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center' },
  flex1: { flex: 1 },
});

export default memo(TransactionDetail);
