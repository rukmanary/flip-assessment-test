/* eslint-disable curly */
import React, { memo, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../themes';

interface SnackbarProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number; // Duration in milliseconds
  useCloseButton?: boolean;
}

const Snackbar = ({
  message,
  visible,
  onDismiss,
  duration = 3000,
  useCloseButton = false,
}: SnackbarProps) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity set to 0

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-dismiss the snackbar after `duration`
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer); // Clear timer on unmount or re-render
    } else {
      // fade out the snackbar
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim, onDismiss, duration]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.snackbarContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}>
      <Text style={styles.snackbarText}>{message}</Text>
      {useCloseButton && (
        <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.black,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  snackbarText: { color: COLORS.white, fontSize: 14, flex: 1 },
  closeButton: { marginLeft: 16, padding: 4 },
  closeText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});

export default memo(Snackbar);
