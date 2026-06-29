export interface Wallet {
  id: string;
  ownerName: string;
  phone: string;
  balance: number;
  createdAt: string;
}

export interface WalletPage {
  content: Wallet[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CreateWalletRequest {
  ownerName: string;
  phone: string;
}
