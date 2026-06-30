export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Wallet {
  _id: string;
  user_id: string;
  balance: number;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  user_id: string;
  type: "credit" | "debit";
  amount: number;
  category: string;
  note: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
