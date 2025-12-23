import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import TransactionForm from './components/TransactionForm';
import SummaryCards from './components/SummaryCards';
import TransactionList from './components/TransactionList';
import { subscribeToTransactions, Transaction } from './lib/firebase';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToTransactions((data) => {
      setTransactions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">SimpleBudget</h1>
          </div>
          <p className="text-gray-600">Śledź swoje wydatki i przychody w prosty sposób</p>
        </header>

        <SummaryCards 
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <TransactionForm />
          </div>
          
          <div className="lg:col-span-2">
            <TransactionList 
              transactions={transactions}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
