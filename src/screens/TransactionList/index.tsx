/* eslint-disable curly */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getTransactionList } from '../../api/apiServices';
import {
  ErrorState,
  FilterModal,
  LoadingState,
  Searchbar,
  TransactionItem,
} from '../../components';
import {
  searchTransactions,
  sortByAscendingName,
  sortByDescendingName,
  sortByNewestDate,
  sortByOldestDate,
} from '../../helpers';
import { useApiService } from '../../hooks';
import { COLORS } from '../../themes';
import { DetailTransactionData, FILTER } from '../../types';

const TransactionList = () => {
  const { data, error, fetchAPI, loading, statusCode, search, applyFilter } =
    useApiService(getTransactionList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('');

  const _filterFunction = useMemo(() => {
    switch (selectedSort) {
      case FILTER.A_Z:
        return sortByAscendingName;
      case FILTER.Z_A:
        return sortByDescendingName;
      case FILTER.NEWEST:
        return sortByNewestDate;
      case FILTER.OLDEST:
        return sortByOldestDate;
      default:
        return undefined;
    }
  }, [selectedSort]);

  useEffect(() => {
    fetchAPI();
    return () => {};
  }, [fetchAPI]);

  useEffect(() => {
    applyFilter(_filterFunction);
  }, [_filterFunction, applyFilter]);

  const _handleSelectOption = useCallback(
    (option: string) => setSelectedSort(option),
    [],
  );

  const _onCloseModal = useCallback(() => setModalVisible(false), []);

  const _openModalFilter = useCallback(() => setModalVisible(true), []);

  const _onSearch = (text: string) => search(text, searchTransactions);

  const _renderItem = useCallback(
    ({ item }: { item: DetailTransactionData }) => (
      <TransactionItem key={item.id} item={item} />
    ),
    [],
  );

  const _emptyState = () => (
    <View style={styles.center}>
      <Text style={styles.emptyText}>Tidak ada transaksi.</Text>
    </View>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState statusCode={statusCode} />;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
        <FilterModal
          visible={modalVisible}
          onClose={_onCloseModal}
          onSelectOption={_handleSelectOption}
        />
      </KeyboardAvoidingView>
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
