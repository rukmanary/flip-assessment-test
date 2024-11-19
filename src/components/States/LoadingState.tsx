import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../themes';

const LoadingState = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color={COLORS.tomato} />
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default memo(LoadingState);
