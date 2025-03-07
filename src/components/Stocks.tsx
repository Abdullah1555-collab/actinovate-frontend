
import React, { useState } from 'react';
import { Bookmark, ArrowUpRight, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import StockDetail from './StockDetail';

// Enhanced stocks data
const watchlistStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.92,
    change: 2.45,
    changePercent: 1.32,
    sector: "Technology"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 328.79,
    change: 4.28,
    changePercent: 1.31,
    sector: "Technology"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 1450.16,
    change: -5.84,
    changePercent: -0.41,
    sector: "Communication Services"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 3120.50,
    change: 35.21,
    changePercent: 1.14,
    sector: "Consumer Discretionary"
  }
];

const trendingStocks = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 435.10,
    change: 15.45,
    changePercent: 3.68,
    sector: "Technology"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 273.58,
    change: -8.45,
    changePercent: -3.09,
    sector: "Consumer Discretionary"
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 297.80,
    change: 5.23,
    changePercent: 1.79,
    sector: "Communication Services"
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices, Inc.",
    price: 108.76,
    change: 3.21,
    changePercent: 3.04,
    sector: "Technology"
  }
];

const topGainers = [
  {
    symbol: "SMCI",
    name: "Super Micro Computer, Inc.",
    price: 956.98,
    change: 102.34,
    changePercent: 11.97,
    sector: "Technology"
  },
  {
    symbol: "ENPH",
    name: "Enphase Energy, Inc.",
    price: 118.23,
    change: 8.72,
    changePercent: 7.96,
    sector: "Energy"
  }
];

const topLosers = [
  {
    symbol: "PINS",
    name: "Pinterest, Inc.",
    price: 37.42,
    change: -4.76,
    changePercent: -11.28,
    sector: "Communication Services"
  },
  {
    symbol: "BYND",
    name: "Beyond Meat, Inc.",
    price: 7.32,
    change: -0.87,
    changePercent: -10.63,
    sector: "Consumer Staples"
  }
];

const Stocks = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWatchlist = watchlistStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrending = trendingStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedStock) {
    return <StockDetail stock={selectedStock} onBack={handleBackToList} />;
  }

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">Stocks</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stocks..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Watchlist</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {filteredWatchlist.length > 0 ? (
                filteredWatchlist.map((stock) => (
                  <div key={stock.symbol} className="stat-card flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetails(stock)}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{stock.symbol}</span>
                        <span className="text-sm text-muted-foreground hidden sm:inline">{stock.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{stock.sector}</div>
                      <div className="text-lg font-medium mt-1">{formatCurrency(stock.price)}</div>
                    </div>
                    <div className={`text-right ${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {formatChange(stock.change, stock.changePercent)}
                      {stock.changePercent >= 0 ? <TrendingUp className="inline ml-1 h-4 w-4" /> : <TrendingDown className="inline ml-1 h-4 w-4" />}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-muted-foreground">No matching stocks found</div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Top Gainers</h2>
            <div className="space-y-3">
              {topGainers.map((stock) => (
                <div key={stock.symbol} className="stat-card flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetails(stock)}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{stock.symbol}</span>
                      <span className="text-sm text-muted-foreground hidden sm:inline">{stock.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{stock.sector}</div>
                    <div className="text-lg font-medium mt-1">{formatCurrency(stock.price)}</div>
                  </div>
                  <div className="text-right text-success">
                    {formatChange(stock.change, stock.changePercent)}
                    <TrendingUp className="inline ml-1 h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Top Losers</h2>
            <div className="space-y-3">
              {topLosers.map((stock) => (
                <div key={stock.symbol} className="stat-card flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewDetails(stock)}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{stock.symbol}</span>
                      <span className="text-sm text-muted-foreground hidden sm:inline">{stock.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{stock.sector}</div>
                    <div className="text-lg font-medium mt-1">{formatCurrency(stock.price)}</div>
                  </div>
                  <div className="text-right text-destructive">
                    {formatChange(stock.change, stock.changePercent)}
                    <TrendingDown className="inline ml-1 h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Trending Stocks</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {filteredTrending.length > 0 ? (
              filteredTrending.map((stock) => (
                <div key={stock.symbol} className="stat-card p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{stock.symbol}</span>
                      <span className="text-sm text-muted-foreground">{stock.name}</span>
                    </div>
                    <div className={`${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'} flex items-center`}>
                      {formatChange(stock.change, stock.changePercent)}
                      {stock.changePercent >= 0 ? <TrendingUp className="ml-1 h-4 w-4" /> : <TrendingDown className="ml-1 h-4 w-4" />}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">{stock.sector}</div>
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
              ))
            ) : (
              <div className="text-center p-4 text-muted-foreground">No matching stocks found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
