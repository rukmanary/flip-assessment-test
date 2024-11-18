import { transformObjectToArray } from '../helpers';
import { TransactionListData } from '../types';
import apiClient from './apiClient';

export const getTransactionList = async () => {
  const response = await apiClient.get('/frontend-test');
  return transformObjectToArray(response.data) as TransactionListData;
};
