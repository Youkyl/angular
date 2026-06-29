export interface Wallet {
  id: number;
  phone: string;
  email: string;
  balance: number;
  code: string;
  currency: string;
}

export interface WalletPage {
  content: Wallet[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CreateWalletRequest {
  phone: string;
  email: string;
  initialBalance: number;
  code: string;
  currency: string;
}
