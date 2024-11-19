import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from '../../assets';
import { COLORS } from '../../themes';

interface InputSearchProps {
  onSearch: (text: string) => void;
  onSortPress: () => void;
  sortText: string;
}
const Searchbar = ({ onSearch, onSortPress, sortText }: InputSearchProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon.Search width={24} height={24} />
        <TextInput
          placeholder="Cari nama, bank, atau nominal"
          placeholderTextColor={COLORS.darkGrey}
          style={styles.input}
          autoCorrect={false}
          onChangeText={onSearch}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.containerFilter}
        onPress={onSortPress}>
        <Text style={styles.textFilter}>{sortText || 'URUTKAN'}</Text>
        <Icon.ChevronDown />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 4,
  },
  containerFilter: { flexDirection: 'row', alignItems: 'center' },
  textFilter: { color: COLORS.tomato, fontWeight: 'bold' },
});

export default memo(Searchbar);
