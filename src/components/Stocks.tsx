
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import StockDetail from './StockDetail';

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

  const handleStockSelect = (stock: typeof stocksData[0]) => {
    setSelectedStock(stock);
  };

  const handleBackClick = () => {
    setSelectedStock(null);
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
        <table className="stock-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th className="text-right">Price</th>
              <th className="text-right">Change</th>
              <th className="text-right">Volume</th>
              <th className="text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => handleStockSelect(stock)}
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                <td className="font-medium">{stock.symbol}</td>
                <td>{stock.name}</td>
                <td className="text-right">${stock.price.toFixed(2)}</td>
                <td className={`text-right ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  {' '}
                  ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </td>
                <td className="text-right">{stock.volume}</td>
                <td className="text-right">{stock.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stocks;
