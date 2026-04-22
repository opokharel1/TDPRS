import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: 'student' | 'accountant' | 'admin';
  walletAddress?: string;
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export interface Transaction {
  id: string;
  transactionHash: string;
  studentId: string;
  amount: number;
  feeType: string;
  date: string;
  semester: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: string;
  walletAddress?: string;
  gasfee?: number;
}

export interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  addTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
  updateTransaction: (id: string, updates: Partial<Transaction>) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
}));

export interface AppState {
  userRole: 'student' | 'accountant' | 'admin' | null;
  setUserRole: (role: 'student' | 'accountant' | 'admin') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  walletConnected: boolean;
  setWalletConnected: (connected: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userRole: null,
  setUserRole: (userRole) => set({ userRole }),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  walletConnected: false,
  setWalletConnected: (walletConnected) => set({ walletConnected }),
}));
