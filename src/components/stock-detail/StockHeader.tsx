
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
    <div className="flex items-center mb-6 p-6 bg-card rounded-lg border border-border shadow-sm">
      <button 
        onClick={onBack}
        className="mr-4 p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>
      
      <div className="mr-4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold rounded-md">
          {stock.symbol.substring(0, 1)}
        </div>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-foreground">{stock.symbol}</h1>
        <p className="text-muted-foreground">{stock.name}</p>
      </div>
      
      <div className="ml-auto text-right">
        <div className="text-3xl font-bold text-foreground">{formatCurrency(stock.price)}</div>
        <div className={`${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'} text-sm font-medium px-2 py-1 rounded-md ${stock.changePercent >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'} inline-block`}>
          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
