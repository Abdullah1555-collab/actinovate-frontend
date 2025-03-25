
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface StockHeaderProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
  };
  onBack: () => void;
}

const StockHeader: React.FC<StockHeaderProps> = ({ stock, onBack }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="flex items-center mb-6">
      <button 
        onClick={onBack}
        className="mr-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>
      
      <div className="mr-4">
        <div className="w-12 h-12 bg-secondary flex items-center justify-center text-foreground font-semibold rounded-md">
          {stock.symbol.substring(0, 1)}
        </div>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-foreground">{stock.symbol}</h1>
        <p className="text-muted-foreground">{stock.name}</p>
      </div>
      
      <div className="ml-auto text-right">
        <div className="text-3xl font-bold text-foreground">{formatCurrency(stock.price)}</div>
        <div className={`${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
