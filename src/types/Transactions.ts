import { NavigationProp } from '@react-navigation/native';

export interface DetailTransactionData {
  id: string;
  amount: number;
  unique_code: number;
  status: string;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
  formattedAmount?: string;
  formattedCreatedAt?: string;
}

export type TransactionListData = DetailTransactionData[];

export interface BankTransferRouteProps {
  from: string;
  to: string;
}

export interface TransactionDetailProps {
  navigation: NavigationProp<any>; // Sesuaikan dengan tipe navigator Anda
  route: {
    params: {
      item: DetailTransactionData;
    };
  };
}

export interface TransactionRowProps {
  leftTitle: string;
  leftValue: string | number;
  rightTitle?: string;
  rightValue?: string | number;
}
