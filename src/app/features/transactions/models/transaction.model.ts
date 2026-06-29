export type PaymentMethod = 'CREDIT_CARD' | 'WALLET_TARGET';

export interface DepositRequest {
  amount: number;
  paymentMethod: PaymentMethod;
}

export interface WithdrawRequest {
  phone: string;
  amount: number;
}

export interface TransferRequest {
  senderPhone: string;
  receiverPhone: string;
  amount: number;
}
