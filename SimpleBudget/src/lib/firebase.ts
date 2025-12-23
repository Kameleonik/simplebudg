import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6aHdoYvf6Q4Joc4ONyAkZBZRDO1zjNEs",
  authDomain: "simplebudget-test.firebaseapp.com",
  projectId: "simplebudget-test",
  storageBucket: "simplebudget-test.firebasestorage.app",
  messagingSenderId: "860609435154",
  appId: "1:860609435154:web:2a51ff04ce48a28162aacb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: Timestamp;
}

const COLLECTION_NAME = 'transactions';

export const addTransaction = async (
  name: string, 
  amount: number, 
  type: 'income' | 'expense'
) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      name,
      amount,
      type,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Błąd dodawania transakcji:', error);
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Błąd usuwania transakcji:', error);
    throw error;
  }
};

export const subscribeToTransactions = (
  callback: (transactions: Transaction[]) => void
) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const transactions: Transaction[] = [];
    snapshot.forEach((doc) => {
      transactions.push({
        id: doc.id,
        ...doc.data(),
      } as Transaction);
    });
    callback(transactions);
  });
};
