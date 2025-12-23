import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function SummaryCards({ totalIncome, totalExpense, balance }: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium">Suma Przychodów</h3>
          <TrendingUp className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-green-600">
          {formatCurrency(totalIncome)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium">Suma Wydatków</h3>
          <TrendingDown className="w-6 h-6 text-red-500" />
        </div>
        <p className="text-3xl font-bold text-red-600">
          {formatCurrency(totalExpense)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium">Saldo Końcowe</h3>
          <Wallet className="w-6 h-6 text-blue-500" />
        </div>
        <p className={`text-3xl font-bold ${
          balance >= 0 ? 'text-blue-600' : 'text-red-600'
        }`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
}
