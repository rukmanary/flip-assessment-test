import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorState = ({ statusCode }: { statusCode: number | null }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.errorText}>
        {statusCode === 404
          ? 'Data tidak ditemukan.'
          : 'Terjadi kesalahan. Silakan coba lagi.'}
      </Text>
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16 },
});
