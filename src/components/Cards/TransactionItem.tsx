import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BankTransferRoute, TransferStatus } from '..';
import { useNavigation } from '../../hooks';
import { COLORS } from '../../themes';
import { DetailTransactionData, Status } from '../../types';

interface TransactionItem {
  item: DetailTransactionData;
}

const getIndicatorColor = (status: string) =>
  status === Status.SUCCESS ? COLORS.mediumSeaGreen : COLORS.tomato;

const TransactionItem = ({ item }: TransactionItem) => {
  const { navigateToDetails } = useNavigation();

  const _handleNavigate = useCallback(() => {
    navigateToDetails(item);
  }, [navigateToDetails, item]);

  return (
    <TouchableOpacity
      onPress={_handleNavigate}
      activeOpacity={0.7}
      style={styles.cardContainer}>
      <View
        style={[
          styles.indicator,
          { backgroundColor: getIndicatorColor(item.status) },
        ]}
      />
      <View style={styles.contentContainer}>
        <View>
          <BankTransferRoute
            from={item.sender_bank}
            to={item.beneficiary_bank}
          />
          <Text style={styles.regularText}>{item.beneficiary_name || ''}</Text>
          <View style={styles.row}>
            <Text>{item.formattedAmount || ''}</Text>
            <View style={styles.circle} />
            <Text>{item.formattedCreatedAt || ''}</Text>
          </View>
        </View>
        <TransferStatus status={item.status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: { flexDirection: 'row', marginBottom: 12 },
  indicator: {
    backgroundColor: COLORS.tomato,
    width: '2%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    width: '98%',
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  regularText: { fontWeight: '400', lineHeight: 28 },
  circle: {
    backgroundColor: COLORS.black,
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});

export default memo(TransactionItem);
