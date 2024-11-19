import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../themes';
import { Status } from '../../types';

interface TransferStatus {
  status: 'SUCCESS' | 'PENDING' | string;
}

const LabelContainer = ({
  style,
  text,
  textStyle,
}: {
  style: object;
  text: string;
  textStyle: object;
}) => (
  <View style={[styles.baseContainer, style]}>
    <Text style={textStyle}>{text}</Text>
  </View>
);

const TransferStatus = ({ status }: TransferStatus) => {
  if (status === Status.SUCCESS) {
    return (
      <LabelContainer
        text="Berhasil"
        style={styles.successContainer}
        textStyle={styles.whiteText}
      />
    );
  } else if (status === Status.PENDING) {
    return (
      <LabelContainer
        text="Pengecekan"
        style={styles.pendingContainer}
        textStyle={styles.blackText}
      />
    );
  }
  return null;
};

const styles = StyleSheet.create({
  baseContainer: { padding: 8, borderRadius: 8, alignItems: 'center' },
  successContainer: { backgroundColor: COLORS.mediumSeaGreen },
  pendingContainer: { borderWidth: 1, borderColor: COLORS.tomato },
  whiteText: { color: COLORS.white, fontWeight: '600' },
  blackText: { color: COLORS.black, fontWeight: '600' },
});

export default TransferStatus;
