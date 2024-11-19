import React, { memo, useCallback, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { COLORS } from '../../themes';

const SORT_OPTIONS = [
  { id: 1, label: 'URUTKAN' },
  { id: 2, label: 'Nama A-Z' },
  { id: 3, label: 'Nama Z-A' },
  { id: 4, label: 'Tanggal Terbaru' },
  { id: 5, label: 'Tanggal Terlama' },
];

interface SortOption {
  id: number;
  label: string;
}

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
}

const FilterModal = ({ visible, onClose, onSelectOption }: SortModalProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const _handleSelectOption = useCallback(
    (option: SortOption) => {
      setSelectedOption(option.id);
      onSelectOption(option.label);
      onClose();
    },
    [onSelectOption, onClose],
  );

  const _renderItem = useCallback(
    ({ item }: { item: SortOption }) => (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => _handleSelectOption(item)}>
        <View style={styles.radioCircle}>
          {selectedOption === item.id && <View style={styles.selectedCircle} />}
        </View>
        <Text
          style={[
            styles.optionText,
            selectedOption === item.id && styles.selectedOptionText,
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    ),
    [selectedOption, _handleSelectOption],
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <FlatList
            data={SORT_OPTIONS}
            keyExtractor={item => item.id.toString()}
            renderItem={_renderItem}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.tomato,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.tomato,
  },
  optionText: { fontSize: 16 },
  selectedOptionText: { fontWeight: 'bold', color: COLORS.tomato },
});

export default memo(FilterModal);
