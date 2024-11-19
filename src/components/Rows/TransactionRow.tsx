import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransactionRowProps } from '../../types';

const TransactionRow = ({
  leftTitle = '',
  leftValue = '',
  rightTitle = '',
  rightValue = '',
}: TransactionRowProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.flex1}>
        <Text style={styles.title}>{leftTitle}</Text>
        <Text style={styles.value}>{leftValue}</Text>
      </View>

      {rightTitle && (
        <View style={styles.flex2}>
          <Text style={styles.title}>{rightTitle}</Text>
          <Text style={styles.value}>{rightValue}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  flex1: { flex: 1 },
  flex2: { flex: 0.7 },
  title: { fontWeight: '600', marginBottom: 4 },
  value: { fontWeight: '400', fontSize: 16 },
});

export default memo(TransactionRow);
