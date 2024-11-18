import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

type ErrorPopupProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
  status: number | null;
};

const ErrorPopup: React.FC<ErrorPopupProps> = ({
  visible,
  message,
  onClose,
  status,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{`Error ${status}`}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});

export default ErrorPopup;
