import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../themes';
import { BankTransferRoute, TransferStatus } from '..';
import { DetailTransactionData, Status } from '../../types';
import colors from '../../themes/colors';
import { useNavigation } from '../../hooks';

interface TransactionItem {
  item: DetailTransactionData;
}

const TransactionItem = ({ item }: TransactionItem) => {
  const { navigateToDetails } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigateToDetails(item)}
      activeOpacity={0.7}
      style={styles.cardContainer}>
      <View
        style={[
          styles.indicator,
          {
            backgroundColor:
              item.status === Status.SUCCESS
                ? COLORS.mediumSeaGreen
                : COLORS.tomato,
          },
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
            <Text>{item.amount || ''}</Text>
            <View style={styles.circle} />
            <Text>{item.created_at || ''}</Text>
          </View>
        </View>
        <TransferStatus status={item.status} />
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
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
    backgroundColor: colors.black,
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
