import React, { useState } from 'react';
import { Bookmark, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import StockDetail from './StockDetail';

// Mock stocks data
const watchlistStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.92,
    change: 2.45,
    changePercent: 1.32
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 328.79,
    change: 4.28,
    changePercent: 1.31
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 1450.16,
    change: -5.84,
    changePercent: -0.41
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 3120.50,
    change: 35.21,
    changePercent: 1.14
  }
];

const trendingStocks = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 435.10,
    change: 15.45,
    changePercent: 3.68
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 273.58,
    change: -8.45,
    changePercent: -3.09
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 297.80,
    change: 5.23,
    changePercent: 1.79
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices, Inc.",
    price: 108.76,
    change: 3.21,
    changePercent: 3.04
  }
];

const Stocks = () => {
  const [selectedStock, setSelectedStock] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatChange = (change, changePercent) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`;
  };

  const handleAddToWatchlist = (symbol) => {
    toast.success(`${symbol} added to watchlist`);
  };

  const handleViewDetails = (stock) => {
    setSelectedStock(stock);
  };

  const handleBackToList = () => {
    setSelectedStock(null);
  };

  // If a stock is selected, show its detail view
  if (selectedStock) {
    return <StockDetail stock={selectedStock} onBack={handleBackToList} />;
  }

  // Otherwise show the list view
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Stocks</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
          <div className="space-y-4">
            {watchlistStocks.map((stock) => (
              <div key={stock.symbol} className="stat-card flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetails(stock)}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{stock.symbol}</span>
                    <span className="text-sm text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className="text-lg font-medium mt-1">{formatCurrency(stock.price)}</div>
                </div>
                <div className={`text-right ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatChange(stock.change, stock.changePercent)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Trending Stocks</h2>
          <div className="space-y-4">
            {trendingStocks.map((stock) => (
              <div key={stock.symbol} className="stat-card p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{stock.symbol}</span>
                    <span className="text-sm text-muted-foreground">{stock.name}</span>
                  </div>
                  <div className={`${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatChange(stock.change, stock.changePercent)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">{formatCurrency(stock.price)}</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWatchlist(stock.symbol);
                    }}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewDetails(stock)}>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
