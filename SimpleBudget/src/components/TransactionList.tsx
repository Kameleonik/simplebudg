import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction, deleteTransaction } from '../lib/firebase';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
}

export default function TransactionList({ transactions, loading }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(amount);
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp?.toDate();
    if (!date) return '';
    return new Intl.DateTimeFormat('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę transakcję?')) {
      try {
        await deleteTransaction(id);
      } catch (error) {
        alert('Błąd podczas usuwania transakcji');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Historia Transakcji
        </h2>
        <div className="text-center py-8 text-gray-500">
          Ładowanie...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Historia Transakcji
      </h2>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Brak transakcji. Dodaj pierwszą transakcję, aby rozpocząć!
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {transaction.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction.type === 'income' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type === 'income' ? 'Przychód' : 'Wydatek'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(transaction.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Usuń transakcję"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
