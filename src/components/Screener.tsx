
import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, ChevronDown, X, Plus, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock data for screener filters
const marketCapOptions = [
  { value: 'any', label: 'Any' },
  { value: 'micro', label: 'Micro ($50M-$300M)' },
  { value: 'small', label: 'Small ($300M-$2B)' },
  { value: 'mid', label: 'Mid ($2B-$10B)' },
  { value: 'large', label: 'Large ($10B-$200B)' },
  { value: 'mega', label: 'Mega (>$200B)' },
];

const sectorOptions = [
  { value: 'any', label: 'Any' },
  { value: 'tech', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'financials', label: 'Financials' },
  { value: 'consumer', label: 'Consumer' },
  { value: 'industrials', label: 'Industrials' },
  { value: 'energy', label: 'Energy' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'materials', label: 'Materials' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'telecom', label: 'Telecommunications' },
];

// Mock stock data for the screener results
const stockScreenerResults = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 185.92,
    change: 2.45,
    changePercent: 1.32,
    marketCap: 2850,
    peRatio: 28.5,
    dividend: 0.92,
    volume: 78.6,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    price: 328.79,
    change: 4.28,
    changePercent: 1.31,
    marketCap: 2420,
    peRatio: 32.1,
    dividend: 1.10,
    volume: 21.4,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    price: 1450.16,
    change: -5.84,
    changePercent: -0.41,
    marketCap: 1860,
    peRatio: 24.2,
    dividend: 0,
    volume: 15.8,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'Consumer',
    price: 3120.50,
    change: 35.21,
    changePercent: 1.14,
    marketCap: 1540,
    peRatio: 58.7,
    dividend: 0,
    volume: 3.7,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer',
    price: 273.58,
    change: -8.45,
    changePercent: -3.09,
    marketCap: 845,
    peRatio: 68.3,
    dividend: 0,
    volume: 24.9,
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financials',
    price: 142.85,
    change: 0.75,
    changePercent: 0.53,
    marketCap: 415,
    peRatio: 15.2,
    dividend: 3.64,
    volume: 12.3,
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    sector: 'Healthcare',
    price: 162.45,
    change: -1.21,
    changePercent: -0.74,
    marketCap: 386,
    peRatio: 19.8,
    dividend: 2.95,
    volume: 6.8,
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    sector: 'Financials',
    price: 258.32,
    change: 3.12,
    changePercent: 1.22,
    marketCap: 372,
    peRatio: 28.4,
    dividend: 1.52,
    volume: 9.1,
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    sector: 'Consumer',
    price: 156.78,
    change: 0.32,
    changePercent: 0.21,
    marketCap: 368,
    peRatio: 25.1,
    dividend: 3.76,
    volume: 7.4,
  },
  {
    symbol: 'UNH',
    name: 'UnitedHealth Group Inc.',
    sector: 'Healthcare',
    price: 445.92,
    change: 8.74,
    changePercent: 2.00,
    marketCap: 362,
    peRatio: 22.6,
    dividend: 1.88,
    volume: 3.2,
  },
];

const formatMarketCap = (value) => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}T`;
  }
  return `$${value}B`;
};

const formatVolume = (value) => {
  if (value >= 1) {
    return `${value.toFixed(1)}M`;
  }
  return `${(value * 1000).toFixed(0)}K`;
};

const Screener = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSort, setActiveSort] = useState({ field: 'marketCap', direction: 'desc' });
  const [activeFilters, setActiveFilters] = useState({
    marketCap: 'any',
    sector: 'any',
    peMin: 0,
    peMax: 100,
    dividendYield: 'any',
  });
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState(stockScreenerResults);
  const [loading, setLoading] = useState(true);
  const [peRange, setPeRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and sort
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let results = [...stockScreenerResults];
      
      // Apply search filter
      if (searchTerm) {
        results = results.filter(stock => 
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
          stock.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply other filters
      if (activeFilters.marketCap !== 'any') {
        // This would have actual logic based on market cap ranges
        results = results.filter(stock => {
          if (activeFilters.marketCap === 'mega') return stock.marketCap > 200;
          if (activeFilters.marketCap === 'large') return stock.marketCap > 10 && stock.marketCap <= 200;
          if (activeFilters.marketCap === 'mid') return stock.marketCap > 2 && stock.marketCap <= 10;
          if (activeFilters.marketCap === 'small') return stock.marketCap > 0.3 && stock.marketCap <= 2;
          if (activeFilters.marketCap === 'micro') return stock.marketCap > 0.05 && stock.marketCap <= 0.3;
          return true;
        });
      }
      
      if (activeFilters.sector !== 'any') {
        results = results.filter(stock => stock.sector.toLowerCase() === activeFilters.sector.toLowerCase());
      }
      
      // PE Ratio filter
      results = results.filter(stock => 
        stock.peRatio >= peRange[0] && stock.peRatio <= peRange[1]
      );
      
      // Dividend filter
      if (activeFilters.dividendYield === 'yes') {
        results = results.filter(stock => stock.dividend > 0);
      } else if (activeFilters.dividendYield === 'no') {
        results = results.filter(stock => stock.dividend === 0);
      }
      
      // Sort results
      results.sort((a, b) => {
        const direction = activeSort.direction === 'asc' ? 1 : -1;
        
        switch (activeSort.field) {
          case 'symbol':
            return direction * a.symbol.localeCompare(b.symbol);
          case 'price':
            return direction * (a.price - b.price);
          case 'change':
            return direction * (a.changePercent - b.changePercent);
          case 'marketCap':
            return direction * (a.marketCap - b.marketCap);
          case 'peRatio':
            return direction * (a.peRatio - b.peRatio);
          case 'dividend':
            return direction * (a.dividend - b.dividend);
          case 'volume':
            return direction * (a.volume - b.volume);
          default:
            return 0;
        }
      });
      
      setFilteredStocks(results);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilters, activeSort, peRange]);

  // Update applied filters
  useEffect(() => {
    const filters = [];
    
    if (activeFilters.marketCap !== 'any') {
      const option = marketCapOptions.find(opt => opt.value === activeFilters.marketCap);
      filters.push({ type: 'marketCap', label: option?.label || activeFilters.marketCap });
    }
    
    if (activeFilters.sector !== 'any') {
      const option = sectorOptions.find(opt => opt.value === activeFilters.sector);
      filters.push({ type: 'sector', label: option?.label || activeFilters.sector });
    }
    
    if (peRange[0] > 0 || peRange[1] < 100) {
      filters.push({ type: 'peRatio', label: `P/E: ${peRange[0]}-${peRange[1]}` });
    }
    
    if (activeFilters.dividendYield !== 'any') {
      filters.push({ 
        type: 'dividend', 
        label: activeFilters.dividendYield === 'yes' ? 'Has Dividend' : 'No Dividend' 
      });
    }
    
    setAppliedFilters(filters);
  }, [activeFilters, peRange]);

  const handleSort = (field) => {
    if (activeSort.field === field) {
      setActiveSort({
        field,
        direction: activeSort.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setActiveSort({
        field,
        direction: 'desc'
      });
    }
  };

  const removeFilter = (filterType) => {
    if (filterType === 'peRatio') {
      setPeRange([0, 100]);
    } else {
      setActiveFilters({
        ...activeFilters,
        [filterType]: 'any'
      });
    }
  };

  const clearAllFilters = () => {
    setActiveFilters({
      marketCap: 'any',
      sector: 'any',
      peMin: 0,
      peMax: 100,
      dividendYield: 'any',
    });
    setPeRange([0, 100]);
    setSearchTerm('');
  };

  const toggleFilterPanel = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    setShowFilters(false);
    toast.success("Filters applied successfully");
  };

  const exportResults = () => {
    toast.success(`Exported ${filteredStocks.length} stocks to CSV`);
  };

  const getSortIcon = (field) => {
    if (activeSort.field !== field) {
      return <ChevronDown className="ml-1 h-4 w-4 opacity-50" />;
    }
    return activeSort.direction === 'asc' ? (
      <ArrowUpDown className="ml-1 h-4 w-4 rotate-180" />
    ) : (
      <ArrowUpDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Stock Screener</h1>
          <p className="text-muted-foreground mt-1">Find and filter stocks based on your criteria</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={toggleFilterPanel}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={exportResults}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10 bg-card"
              placeholder="Search by symbol or company name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="hidden lg:block">
          <Select value={activeSort.field} onValueChange={(value) => setActiveSort({ field: value, direction: activeSort.direction })}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="marketCap">Market Cap</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="change">Change %</SelectItem>
                <SelectItem value="peRatio">P/E Ratio</SelectItem>
                <SelectItem value="dividend">Dividend</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applied filters */}
      {appliedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {appliedFilters.map((filter, index) => (
            <div key={index} className="filter-chip active">
              {filter.label}
              <button
                className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center"
                onClick={() => removeFilter(filter.type)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {appliedFilters.length > 0 && (
            <button
              className="text-sm text-muted-foreground hover:text-foreground ml-2"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Filter panel - slides in from right on mobile/tablet */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-full sm:w-96 bg-background border-l border-border p-6 z-40 overflow-y-auto transform transition-transform duration-300 ease-in-out",
        showFilters ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Filters</h3>
          <Button variant="ghost" size="icon" onClick={toggleFilterPanel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Market Cap</h4>
            <Select 
              value={activeFilters.marketCap}
              onValueChange={(value) => setActiveFilters({...activeFilters, marketCap: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select market cap range" />
              </SelectTrigger>
              <SelectContent>
                {marketCapOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-medium mb-2">Sector</h4>
            <Select 
              value={activeFilters.sector}
              onValueChange={(value) => setActiveFilters({...activeFilters, sector: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-medium mb-2">P/E Ratio: {peRange[0]} - {peRange[1]}</h4>
            <Slider 
              value={peRange} 
              min={0} 
              max={100} 
              step={1} 
              onValueChange={setPeRange}
              className="my-6"
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Dividend</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dividend-any" 
                  checked={activeFilters.dividendYield === 'any'}
                  onCheckedChange={() => setActiveFilters({...activeFilters, dividendYield: 'any'})}
                />
                <Label htmlFor="dividend-any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dividend-yes" 
                  checked={activeFilters.dividendYield === 'yes'}
                  onCheckedChange={() => setActiveFilters({...activeFilters, dividendYield: 'yes'})}
                />
                <Label htmlFor="dividend-yes">Pays Dividend</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dividend-no" 
                  checked={activeFilters.dividendYield === 'no'}
                  onCheckedChange={() => setActiveFilters({...activeFilters, dividendYield: 'no'})}
                />
                <Label htmlFor="dividend-no">No Dividend</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6 mt-6 border-t">
          <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
            Reset
          </Button>
          <Button className="flex-1" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('symbol')} className="cursor-pointer">
                <div className="flex items-center">
                  Symbol
                  {getSortIcon('symbol')}
                </div>
              </th>
              <th>Name</th>
              <th>Sector</th>
              <th onClick={() => handleSort('price')} className="cursor-pointer text-right">
                <div className="flex items-center justify-end">
                  Price
                  {getSortIcon('price')}
                </div>
              </th>
              <th onClick={() => handleSort('change')} className="cursor-pointer text-right">
                <div className="flex items-center justify-end">
                  Change %
                  {getSortIcon('change')}
                </div>
              </th>
              <th onClick={() => handleSort('marketCap')} className="cursor-pointer text-right">
                <div className="flex items-center justify-end">
                  Market Cap
                  {getSortIcon('marketCap')}
                </div>
              </th>
              <th onClick={() => handleSort('peRatio')} className="cursor-pointer text-right">
                <div className="flex items-center justify-end">
                  P/E
                  {getSortIcon('peRatio')}
                </div>
              </th>
              <th onClick={() => handleSort('dividend')} className="cursor-pointer text-right">
                <div className="flex items-center justify-end">
                  Div Yield
                  {getSortIcon('dividend')}
                </div>
              </th>
              <th onClick={() => handleSort('volume')} className="cursor-pointer text-right">
                <div className="flex items-center justify-end">
                  Volume
                  {getSortIcon('volume')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton loading state
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 9 }).map((_, cellIndex) => (
                    <td key={cellIndex}>
                      <div className="h-5 w-full shimmer-effect rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td className="font-medium">{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>{stock.sector}</td>
                  <td className="text-right">${stock.price.toFixed(2)}</td>
                  <td className={`text-right ${stock.change >= 0 ? 'profit' : 'loss'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="text-right">{formatMarketCap(stock.marketCap)}</td>
                  <td className="text-right">{stock.peRatio.toFixed(1)}</td>
                  <td className="text-right">{stock.dividend > 0 ? stock.dividend.toFixed(2) + '%' : '-'}</td>
                  <td className="text-right">{formatVolume(stock.volume)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-8 text-muted-foreground">
                  No stocks found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Results stats */}
      <div className="mt-4 text-sm text-muted-foreground">
        {!loading && <p>Showing {filteredStocks.length} results</p>}
      </div>
    </div>
  );
};

export default Screener;
