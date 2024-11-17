import apiClient from './apiClient';

export const getTransactionList = async () => {
  const response = await apiClient.get('/frontend-test');
  return response.data;
};
