import { formatCurrency, formatDate, formatUpperCase } from '../helpers';
import { DetailTransactionData } from '../types';

export class DetailTransaction {
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
  formattedAmount: string;
  formattedCreatedAt: string;

  constructor(data: DetailTransactionData) {
    this.id = data.id;
    this.amount = data.amount;
    this.unique_code = data.unique_code;
    this.status = data.status;
    this.sender_bank = formatUpperCase(data.sender_bank);
    this.account_number = data.account_number;
    this.beneficiary_name = data.beneficiary_name?.toUpperCase?.();
    this.beneficiary_bank = formatUpperCase(data.beneficiary_bank);
    this.remark = data.remark;
    this.created_at = data.created_at;
    this.completed_at = data.completed_at;
    this.fee = data.fee;
    this.formattedAmount = formatCurrency({ value: data.amount });
    this.formattedCreatedAt = formatDate({ input: data.created_at });
  }

  static fromJson(json: any): DetailTransaction {
    return new DetailTransaction({
      id: json.id,
      amount: json.amount,
      unique_code: json.unique_code,
      status: json.status,
      sender_bank: json.sender_bank,
      account_number: json.account_number,
      beneficiary_name: json.beneficiary_name,
      beneficiary_bank: json.beneficiary_bank,
      remark: json.remark,
      created_at: json.created_at,
      completed_at: json.completed_at,
      fee: json.fee,
    });
  }
}
