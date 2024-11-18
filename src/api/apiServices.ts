import { transformObjectToArray } from '../helpers';
import { TransactionList } from '../models/TransactionListModel';
import { TransactionListData } from '../types';
import apiClient from './apiClient';

export const getTransactionList = async () => {
  const response = await apiClient.get('/frontend-test');
  // return transformObjectToArray(response.data) as TransactionListData;
  const transformedData = transformObjectToArray(
    response.data,
  ) as TransactionListData;
  return TransactionList.fromJson(transformedData);
};
