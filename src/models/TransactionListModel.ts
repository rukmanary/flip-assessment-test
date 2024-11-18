import { TransactionListData } from '../types';
import { DetailTransaction } from './DetailTransactionModel';

export class TransactionList {
  static fromJson(data: TransactionListData): DetailTransaction[] {
    return data.map(item => DetailTransaction.fromJson(item));
  }
}
