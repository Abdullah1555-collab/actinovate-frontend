import React, { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Search, SlidersHorizontal, X, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

// Mock data for the screener
const mockStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    industry: "Consumer Electronics",
    price: 185.92,
    change: 2.45,
    changePercent: 1.32,
    marketCap: 2980000000000,
    pe: 31.42,
    eps: 5.91,
    dividendYield: 0.48,
    volume: 56780000,
    beta: 1.28,
    founded: 1976,
    netProfit: 99580000000,
    netProfitPercentage: 25.3,
    revenue: 394330000000,
    sma10: 183.56,
    sma20: 179.43,
    sma50: 175.29,
    sma200: 168.77,
    rsi: 68.2,
    relativeVolume: 1.2,
    psRatio: 8.1,
    pbRatio: 46.2,
    pcfRatio: 28.4,
    momentum: 6.5
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology",
    industry: "Software",
    price: 328.79,
    change: 4.28,
    changePercent: 1.31,
    marketCap: 2450000000000,
    pe: 35.21,
    eps: 9.34,
    dividendYield: 0.73,
    volume: 22340000,
    beta: 0.92,
    founded: 1975,
    netProfit: 72360000000,
    netProfitPercentage: 36.8,
    revenue: 196520000000,
    sma10: 326.78,
    sma20: 319.45,
    sma50: 312.37,
    sma200: 287.89,
    rsi: 71.4,
    relativeVolume: 0.95,
    psRatio: 12.5,
    pbRatio: 15.8,
    pcfRatio: 26.2,
    momentum: 8.3
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Technology",
    industry: "Internet Content & Information",
    price: 1450.16,
    change: -5.84,
    changePercent: -0.41,
    marketCap: 1840000000000,
    pe: 25.68,
    eps: 56.47,
    dividendYield: 0,
    volume: 14560000,
    beta: 1.06,
    founded: 1998,
    netProfit: 73800000000,
    netProfitPercentage: 21.6,
    revenue: 341820000000,
    sma10: 1448.32,
    sma20: 1417.89,
    sma50: 1389.45,
    sma200: 1298.76,
    rsi: 57.8,
    relativeVolume: 0.87,
    psRatio: 5.4,
    pbRatio: 6.3,
    pcfRatio: 17.9,
    momentum: 4.2
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    sector: "Consumer Cyclical",
    industry: "Internet Retail",
    price: 3120.50,
    change: 35.21,
    changePercent: 1.14,
    marketCap: 1560000000000,
    pe: 76.11,
    eps: 41.00,
    dividendYield: 0,
    volume: 17890000,
    beta: 1.19,
    founded: 1994,
    netProfit: 26263000000,
    netProfitPercentage: 5.1,
    revenue: 513983000000,
    sma10: 3087.67,
    sma20: 3002.45,
    sma50: 2945.78,
    sma200: 2738.91,
    rsi: 63.5,
    relativeVolume: 1.12,
    psRatio: 3.0,
    pbRatio: 12.7,
    pcfRatio: 24.6,
    momentum: 5.8
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Technology",
    industry: "Semiconductors",
    price: 435.10,
    change: 15.45,
    changePercent: 3.68,
    marketCap: 1070000000000,
    pe: 112.83,
    eps: 3.86,
    dividendYield: 0.07,
    volume: 42560000,
    beta: 1.74,
    founded: 1993,
    netProfit: 9752000000,
    netProfitPercentage: 32.8,
    revenue: 29704000000,
    sma10: 412.34,
    sma20: 389.67,
    sma50: 367.21,
    sma200: 289.43,
    rsi: 78.4,
    relativeVolume: 1.34,
    psRatio: 36.0,
    pbRatio: 34.5,
    pcfRatio: 87.6,
    momentum: 15.7
  }
];

// Sectors
const sectors = [
  'All',
  'Technology',
  'Healthcare',
  'Financial Services',
  'Consumer Cyclical',
  'Industrials',
  'Communication Services',
  'Consumer Defensive',
  'Energy',
  'Basic Materials',
  'Real Estate',
  'Utilities'
];

// Industries
const industries = [
  'All',
  'Software',
  'Semiconductors',
  'Consumer Electronics',
  'Internet Content & Information',
  'Internet Retail',
  'Biotechnology',
  'Banks',
  'Insurance',
  'Aerospace & Defense',
  'Telecom'
];

const Screener = () => {
  const [stocks, setStocks] = useState(mockStocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: 'marketCap',
    direction: 'desc'
  });
  const [alertedStocks, setAlertedStocks] = useState<string[]>([]);
  
  // Filter states
  const [filters, setFilters] = useState({
    ticker: '',
    minPrice: '',
    maxPrice: '',
    sector: 'All',
    industry: '',
    foundedYear: '',
    netProfit: '',
    netProfitPercentage: '',
    revenue: '',
    pe: '',
    dividendYield: '',
    basicEPS: '',
    dilutedEPS: '',
    sma10: '',
    sma20: '',
    sma50: '',
    sma200: '',
    beta1Year: '',
    beta5Year: '',
    relativeVolume: '',
    psRatio: '',
    pbRatio: '',
    pcfRatio: '',
    rsi: '',
    momentum: ''
  });
  
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const resetFilters = () => {
    setFilters({
      ticker: '',
      minPrice: '',
      maxPrice: '',
      sector: 'All',
      industry: '',
      foundedYear: '',
      netProfit: '',
      netProfitPercentage: '',
      revenue: '',
      pe: '',
      dividendYield: '',
      basicEPS: '',
      dilutedEPS: '',
      sma10: '',
      sma20: '',
      sma50: '',
      sma200: '',
      beta1Year: '',
      beta5Year: '',
      relativeVolume: '',
      psRatio: '',
      pbRatio: '',
      pcfRatio: '',
      rsi: '',
      momentum: ''
    });
    
    setStocks(mockStocks);
    toast.success("Filters have been reset");
  };
  
  const applyFilters = () => {
    let filteredStocks = [...mockStocks];
    
    // Apply ticker filter
    if (filters.ticker) {
      filteredStocks = filteredStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(filters.ticker.toLowerCase())
      );
    }
    
    // Apply price filters
    if (filters.minPrice) {
      filteredStocks = filteredStocks.filter(stock => 
        stock.price >= parseFloat(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      filteredStocks = filteredStocks.filter(stock => 
        stock.price <= parseFloat(filters.maxPrice)
      );
    }
    
    // Apply sector filter
    if (filters.sector && filters.sector !== 'All') {
      filteredStocks = filteredStocks.filter(stock => 
        stock.sector === filters.sector
      );
    }
    
    // Apply industry filter
    if (filters.industry && filters.industry !== 'All') {
      filteredStocks = filteredStocks.filter(stock => 
        stock.industry.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }
    
    setStocks(filteredStocks);
    toast.success(`Found ${filteredStocks.length} stocks matching your criteria`);
  };
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    const sortedStocks = [...stocks].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setStocks(sortedStocks);
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronDown className="sort-icon h-4 w-4 opacity-50" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="sort-icon h-4 w-4" />
      : <ChevronDown className="sort-icon h-4 w-4" />;
  };
  
  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Symbol', 'Name', 'Sector', 'Price', 'Change', 'Change %', 'Market Cap', 'P/E', 'Dividend Yield'];
    const csvContent = [
      headers.join(','),
      ...stocks.map(stock => [
        stock.symbol,
        `"${stock.name}"`,
        `"${stock.sector}"`,
        stock.price,
        stock.change,
        stock.changePercent,
        stock.marketCap,
        stock.pe,
        stock.dividendYield
      ].join(','))
    ].join('\n');
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'stock_screener_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('CSV file exported successfully');
  };
  
  const formatMarketCap = (value) => {
    if (value >= 1000000000000) {
      return `$${(value / 1000000000000).toFixed(2)}T`;
    } else if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else {
      return `$${value.toLocaleString()}`;
    }
  };

  const toggleAlert = (symbol: string) => {
    if (alertedStocks.includes(symbol)) {
      setAlertedStocks(alertedStocks.filter(s => s !== symbol));
      toast.success(`Alert removed for ${symbol}`);
    } else {
      setAlertedStocks([...alertedStocks, symbol]);
      toast.success(`Alert set for ${symbol}`);
    }
  };
  
  return (
    <div className="screener-page">
      <div className="header-section">
        <div>
          <h1 className="page-title">Stock Screener</h1>
          <p className="subtitle">Find and filter stocks based on your criteria</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={toggleFilter} className="mobile-filter-toggle">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" onClick={exportToCSV} className="export-btn">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="screener-layout">
        <div className={`filter-sidebar ${filterVisible ? 'open' : 'closed'}`}>
          <div className="filter-sidebar-header">
            <h3 className="text-sm font-medium">Filters</h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleFilter}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="filter-sidebar-content">
            <div className="filter-group">
              <label className="filter-label">Search Ticker:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Ticker Symbol" 
                name="ticker"
                value={filters.ticker}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Price Range:</label>
              <div className="filter-row">
                <Input 
                  className="filter-input-half" 
                  placeholder="Min Price" 
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  type="number"
                />
                <Input 
                  className="filter-input-half" 
                  placeholder="Max Price" 
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  type="number"
                />
              </div>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Sector:</label>
              <select 
                className="filter-select" 
                name="sector"
                value={filters.sector}
                onChange={handleFilterChange}
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Industry:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Industry" 
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Founded Year:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Founded Year" 
                name="foundedYear"
                value={filters.foundedYear}
                onChange={handleFilterChange}
                type="number"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Net Profit:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Net Profit" 
                name="netProfit"
                value={filters.netProfit}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Net Profit (%):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Net Profit %" 
                name="netProfitPercentage"
                value={filters.netProfitPercentage}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Revenue:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Revenue" 
                name="revenue"
                value={filters.revenue}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Price/Earning (P/E):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter P/E" 
                name="pe"
                value={filters.pe}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Dividend Yield:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Dividend Yield" 
                name="dividendYield"
                value={filters.dividendYield}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Basic EPS:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Basic EPS" 
                name="basicEPS"
                value={filters.basicEPS}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Diluted EPS:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Diluted EPS" 
                name="dilutedEPS"
                value={filters.dilutedEPS}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">SMA (10):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter SMA (10)" 
                name="sma10"
                value={filters.sma10}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">SMA (20):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter SMA (20)" 
                name="sma20"
                value={filters.sma20}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">SMA (50):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter SMA (50)" 
                name="sma50"
                value={filters.sma50}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">SMA (200):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter SMA (200)" 
                name="sma200"
                value={filters.sma200}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Beta (1 Year):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Beta (1 Year)" 
                name="beta1Year"
                value={filters.beta1Year}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Beta (5 Year):</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Beta (5 Year)" 
                name="beta5Year"
                value={filters.beta5Year}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Relative Volume:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Relative Volume" 
                name="relativeVolume"
                value={filters.relativeVolume}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">P/S Ratio:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter P/S Ratio" 
                name="psRatio"
                value={filters.psRatio}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">P/B Ratio:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter P/B Ratio" 
                name="pbRatio"
                value={filters.pbRatio}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">P/CF Ratio:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter P/CF Ratio" 
                name="pcfRatio"
                value={filters.pcfRatio}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">RSI:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter RSI" 
                name="rsi"
                value={filters.rsi}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Momentum:</label>
              <Input 
                className="filter-input" 
                placeholder="Enter Momentum" 
                name="momentum"
                value={filters.momentum}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="mt-6 space-y-2">
              <Button onClick={applyFilters} className="apply-filters-btn">
                Apply Filters
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
        
        <div className="results-section">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Search by symbol or company name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="results-header">
            <span>{stocks.length} stocks found</span>
          </div>
          
          <div className="table-container">
            <table className="stock-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('symbol')}>
                    <div className="th-content group">
                      Symbol
                      {getSortIcon('symbol')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('name')}>
                    <div className="th-content group">
                      Name
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('sector')}>
                    <div className="th-content group">
                      Sector
                      {getSortIcon('sector')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('price')}>
                    <div className="th-content justify-end group">
                      Price
                      {getSortIcon('price')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('changePercent')}>
                    <div className="th-content justify-end group">
                      Change %
                      {getSortIcon('changePercent')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('marketCap')}>
                    <div className="th-content justify-end group">
                      Market Cap
                      {getSortIcon('marketCap')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('pe')}>
                    <div className="th-content justify-end group">
                      P/E
                      {getSortIcon('pe')}
                    </div>
                  </th>
                  <th onClick={() => handleSort('dividendYield')}>
                    <div className="th-content justify-end group">
                      Div Yield
                      {getSortIcon('dividendYield')}
                    </div>
                  </th>
                  <th>
                    <div className="th-content justify-center group">
                      Alert
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stocks
                  .filter(stock => 
                    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((stock) => (
                    <tr key={stock.symbol} className="stock-row">
                      <td className="font-medium">{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td>{stock.sector}</td>
                      <td className="text-right">${stock.price.toFixed(2)}</td>
                      <td className={`text-right ${stock.changePercent >= 0 ? 'profit' : 'loss'}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="text-right">{formatMarketCap(stock.marketCap)}</td>
                      <td className="text-right">{stock.pe.toFixed(2)}</td>
                      <td className="text-right">{(stock.dividendYield * 100).toFixed(2)}%</td>
                      <td className="text-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAlert(stock.symbol);
                          }}
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
      </div>
    </div>
  );
};

export default Screener;
