import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../themes';

const LoadingState = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={COLORS.tomato} />
    </View>
  );
};

export default LoadingState;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
