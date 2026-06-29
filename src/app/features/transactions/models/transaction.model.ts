export type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'BILL_PAYMENT';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description?: string;
}

export interface DepositRequest {
  amount: number;
  description?: string;
}

export interface WithdrawRequest {
  walletId: string;
  amount: number;
  description?: string;
}

export interface TransferRequest {
  sourcePhone: string;
  destination: string;
  amount: number;
  description?: string;
}
