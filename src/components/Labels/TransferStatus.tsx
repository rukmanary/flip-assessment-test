import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../themes';
import { Status } from '../../types';

interface TransferStatus {
  status: 'SUCCESS' | 'PENDING' | string;
}

const TransferStatus = ({ status }: TransferStatus) => {
  if (status === Status.SUCCESS) {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.whiteText}>Berhasil</Text>
      </View>
    );
  } else if (status === Status.PENDING) {
    return (
      <View style={styles.borderOnlyContainer}>
        <Text style={styles.blackText}>Pengecekan</Text>
      </View>
    );
  }
};

export default TransferStatus;

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: COLORS.mediumSeaGreen,
    padding: 8,
    borderRadius: 8,
  },
  borderOnlyContainer: {
    borderWidth: 1,
    borderColor: COLORS.tomato,
    padding: 8,
    borderRadius: 8,
  },
  whiteText: { color: COLORS.white, fontWeight: '600' },
  blackText: { color: COLORS.black, fontWeight: '600' },
});
