
import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StockDetail from './StockDetail';
import { toast } from 'sonner';

// Mock stock data
const stocksData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.92,
    change: 2.34,
    changePercent: 1.28,
    volume: "52.4M",
    marketCap: "2.89T"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 328.79,
    change: 4.23,
    changePercent: 1.30,
    volume: "35.2M",
    marketCap: "2.45T"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 134.99,
    change: -0.98,
    changePercent: -0.72,
    volume: "28.1M",
    marketCap: "1.70T"
  }
];

const Stocks = () => {
  const [selectedStock, setSelectedStock] = useState<null | typeof stocksData[0]>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertedStocks, setAlertedStocks] = useState<string[]>([]);

  const handleStockSelect = (stock: typeof stocksData[0]) => {
    setSelectedStock(stock);
  };

  const handleBackClick = () => {
    setSelectedStock(null);
  };

  const toggleAlert = (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation();
    
    if (alertedStocks.includes(symbol)) {
      setAlertedStocks(alertedStocks.filter(s => s !== symbol));
      toast.success(`Alert removed for ${symbol}`);
    } else {
      setAlertedStocks([...alertedStocks, symbol]);
      toast.success(`Alert set for ${symbol}`);
    }
  };

  const filteredStocks = stocksData.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedStock) {
    return <StockDetail stock={selectedStock} onBack={handleBackClick} />;
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Stocks</h1>
        <p className="text-muted-foreground mt-1">Track and analyze stocks</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="stock-table w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Symbol</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Price</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Change</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Volume</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Market Cap</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Alert</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => handleStockSelect(stock)}
                className="cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors"
              >
                <td className="px-4 py-4 font-medium">{stock.symbol}</td>
                <td className="px-4 py-4 text-gray-600">{stock.name}</td>
                <td className="px-4 py-4 text-right">${stock.price.toFixed(2)}</td>
                <td className={`px-4 py-4 text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  {' '}
                  ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </td>
                <td className="px-4 py-4 text-right text-gray-600">{stock.volume}</td>
                <td className="px-4 py-4 text-right text-gray-600">{stock.marketCap}</td>
                <td className="px-4 py-4 text-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={(e) => toggleAlert(e, stock.symbol)}
                  >
                    {alertedStocks.includes(stock.symbol) ? (
                      <Bell className="h-4 w-4 text-primary" fill="currentColor" />
                    ) : (
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stocks;
