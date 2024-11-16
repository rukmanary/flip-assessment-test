import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { COLORS } from '../../themes';

const TransactionDetail = ({ navigation }: { navigation: any }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentStyle}>
    <View>
      <Text>Transaction Detail</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.whiteSmoke },
  contentStyle: { flex: 1, padding: 16 },
});

export default TransactionDetail;
