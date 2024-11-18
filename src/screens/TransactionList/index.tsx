import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../themes';
import { useApiService } from '../../hooks';
import { getTransactionList } from '../../api/apiServices';
import { Searchbar, TransactionItem } from '../../components';
import { DetailTransactionData } from '../../types';
import { searchTransactions } from '../../helpers';
import SortModal from '../../components/Modals/FilterModal';

const TransactionList = () => {
  const { data, error, fetchAPI, loading, statusCode, search } =
    useApiService(getTransactionList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('');

  useEffect(() => {
    fetchAPI();
    return () => {};
  }, [fetchAPI]);

  const _handleSelectOption = (option: string) => {
    setSelectedSort(option);
  };

  const _openModalFilter = () => setModalVisible(true);

  const _onSearch = (text: string) => search(text, searchTransactions);

  const _renderItem = ({ item }: { item: DetailTransactionData }) => (
    <TransactionItem key={item.id} item={item} />
  );

  const _emptyState = () => (
    <View style={styles.center}>
      <Text style={styles.emptyText}>Tidak ada transaksi.</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.tomato} />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {statusCode === 404
            ? 'Data tidak ditemukan.'
            : 'Terjadi kesalahan. Silakan coba lagi.'}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        onSearch={_onSearch}
        onSortPress={_openModalFilter}
        sortText={selectedSort}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderItem}
        contentContainerStyle={styles.contentStyle}
        ListEmptyComponent={_emptyState}
      />
      <SortModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectOption={_handleSelectOption}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.whiteSmoke },
  contentStyle: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: COLORS.darkGrey, fontSize: 16 },
  errorText: { color: 'red', fontSize: 16 },
});

export default TransactionList;
