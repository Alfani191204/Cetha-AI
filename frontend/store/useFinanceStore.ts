import { create } from 'zustand';

// 1. Interfaces & Types
export type StockStatus = 'green' | 'yellow' | 'red';

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  status: StockStatus;
  price: number;
}

export interface TransactionItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Transaction {
  id: string;
  storeName: string;
  date: string;
  type: 'income' | 'expense';
  items: TransactionItem[];
  total: number;
}

export interface ExtractedReceipt {
  storeName: string;
  date: string;
  items: TransactionItem[];
  total: number;
}

export interface ScanState {
  status: 'idle' | 'loading' | 'success' | 'error';
  extractedData: ExtractedReceipt | null;
  errorMessage: string | null;
}

export interface FinanceStats {
  income: number;
  expense: number;
  balance: number;
}

// 2. Store State Interface
interface FinanceStoreState {
  // Finance State
  stats: FinanceStats;
  transactions: Transaction[];
  
  // Scanning State
  scan: ScanState;
  
  // Inventory State
  inventory: InventoryItem[];

  // Actions
  setScanStatus: (status: ScanState['status'], errorMessage?: string) => void;
  setExtractedData: (data: ExtractedReceipt) => void;
  resetScanState: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateInventoryStock: (items: TransactionItem[], type: 'income' | 'expense') => void;
}

// 3. Helper Functions
const getStockStatus = (stock: number): StockStatus => {
  if (stock > 20) return 'green';
  if (stock > 5) return 'yellow';
  return 'red';
};

// 4. Initial Mock Data
const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Biji Kopi Arabica 1kg', stock: 50, status: 'green', price: 150000 },
  { id: '2', name: 'Susu UHT 1L', stock: 10, status: 'yellow', price: 18000 },
  { id: '3', name: 'Gula Aren 1kg', stock: 3, status: 'red', price: 35000 }
];

const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    storeName: 'Supplier A',
    date: new Date().toISOString(),
    type: 'expense',
    items: [
      { name: 'Biji Kopi Arabica 1kg', quantity: 5, price: 150000, total: 750000 }
    ],
    total: 750000
  }
];

const initialStats: FinanceStats = {
  income: 1500000,
  expense: 750000,
  balance: 750000
};

// 5. Store Implementation
export const useFinanceStore = create<FinanceStoreState>((set, get) => ({
  stats: initialStats,
  transactions: initialTransactions,
  inventory: initialInventory,
  
  scan: {
    status: 'idle',
    extractedData: null,
    errorMessage: null,
  },

  setScanStatus: (status, errorMessage = null) => 
    set((state) => ({ scan: { ...state.scan, status, errorMessage } })),

  setExtractedData: (data) =>
    set((state) => ({ scan: { ...state.scan, extractedData: data, status: 'success' } })),

  resetScanState: () =>
    set(() => ({ scan: { status: 'idle', extractedData: null, errorMessage: null } })),

  updateInventoryStock: (items, type) => {
    set((state) => {
      // Create a new array for updated inventory or add new items if they don't exist
      const updatedInventory = [...state.inventory];

      items.forEach(itemInTx => {
        const existingItemIndex = updatedInventory.findIndex(
          invItem => invItem.name.toLowerCase() === itemInTx.name.toLowerCase()
        );

        if (existingItemIndex >= 0) {
          const invItem = updatedInventory[existingItemIndex];
          // If expense (buying stock), stock increases. If income (selling), stock decreases.
          const newStock = type === 'expense' 
            ? invItem.stock + itemInTx.quantity 
            : Math.max(0, invItem.stock - itemInTx.quantity);
            
          updatedInventory[existingItemIndex] = {
            ...invItem,
            stock: newStock,
            status: getStockStatus(newStock)
          };
        } else if (type === 'expense') {
          // If buying a new item that wasn't in inventory, add it
          const newStock = itemInTx.quantity;
          updatedInventory.push({
            id: `inv-${Date.now()}-${Math.random()}`,
            name: itemInTx.name,
            stock: newStock,
            status: getStockStatus(newStock),
            price: itemInTx.price
          });
        }
      });

      return { inventory: updatedInventory };
    });
  },

  addTransaction: (transactionData) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `tx-${Date.now()}`
    };

    set((state) => {
      // Update Finance Stats
      const newStats = { ...state.stats };
      if (newTransaction.type === 'income') {
        newStats.income += newTransaction.total;
        newStats.balance += newTransaction.total;
      } else {
        newStats.expense += newTransaction.total;
        newStats.balance -= newTransaction.total;
      }

      return {
        transactions: [newTransaction, ...state.transactions],
        stats: newStats
      };
    });

    // Update stock levels based on the new transaction
    get().updateInventoryStock(newTransaction.items, newTransaction.type);
  }
}));
