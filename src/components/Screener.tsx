
import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Download } from 'lucide-react';

// Mock data for the screener
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 185.92, marketCap: 2.94, peRatio: 30.5, dividendYield: 0.5 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', price: 328.79, marketCap: 2.44, peRatio: 34.2, dividendYield: 0.8 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 1450.16, marketCap: 1.84, peRatio: 25.1, dividendYield: 0 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', sector: 'Consumer Cyclical', price: 3120.50, marketCap: 1.59, peRatio: 60.8, dividendYield: 0 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', sector: 'Automotive', price: 273.58, marketCap: 0.87, peRatio: 75.2, dividendYield: 0 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', price: 435.10, marketCap: 1.07, peRatio: 62.1, dividendYield: 0.1 },
  { symbol: 'META', name: 'Meta Platforms, Inc.', sector: 'Technology', price: 297.80, marketCap: 0.76, peRatio: 28.4, dividendYield: 0.5 },
  { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Defensive', price: 156.72, marketCap: 0.42, peRatio: 26.5, dividendYield: 1.4 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', price: 167.15, marketCap: 0.40, peRatio: 15.2, dividendYield: 3.0 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services', price: 144.23, marketCap: 0.42, peRatio: 11.7, dividendYield: 2.5 },
  { symbol: 'V', name: 'Visa Inc.', sector: 'Financial Services', price: 233.45, marketCap: 0.49, peRatio: 33.8, dividendYield: 0.7 },
  { symbol: 'PG', name: 'Procter & Gamble Co.', sector: 'Consumer Defensive', price: 156.32, marketCap: 0.37, peRatio: 25.6, dividendYield: 2.4 },
  { symbol: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Healthcare', price: 456.78, marketCap: 0.43, peRatio: 21.3, dividendYield: 1.3 },
  { symbol: 'HD', name: 'Home Depot Inc.', sector: 'Consumer Cyclical', price: 325.89, marketCap: 0.33, peRatio: 23.7, dividendYield: 2.3 },
  { symbol: 'BAC', name: 'Bank of America Corp.', sector: 'Financial Services', price: 34.56, marketCap: 0.27, peRatio: 11.2, dividendYield: 2.7 },
];

// Filter options
const sectors = ['All', 'Technology', 'Financial Services', 'Healthcare', 'Consumer Cyclical', 'Consumer Defensive', 'Automotive'];
const marketCapOptions = ['All', '>$1T', '$500B-$1T', '$100B-$500B', '$10B-$100B', '<$10B'];
const peRatioOptions = ['All', '<10', '10-20', '20-50', '>50'];
const dividendOptions = ['All', 'No Dividend', '0-1%', '1-2%', '2-3%', '>3%'];

const Screener: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedMarketCap, setSelectedMarketCap] = useState('All');
  const [selectedPE, setSelectedPE] = useState('All');
  const [selectedDividend, setSelectedDividend] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'symbol', direction: 'ascending' });
  const [filteredStocks, setFilteredStocks] = useState(mockStocks);

  // Filter and sort stocks based on criteria
  useEffect(() => {
    let filtered = [...mockStocks];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sector filter
    if (selectedSector !== 'All') {
      filtered = filtered.filter(stock => stock.sector === selectedSector);
    }

    // Apply market cap filter
    if (selectedMarketCap !== 'All') {
      filtered = filtered.filter(stock => {
        const cap = stock.marketCap;
        switch (selectedMarketCap) {
          case '>$1T': return cap >= 1;
          case '$500B-$1T': return cap >= 0.5 && cap < 1;
          case '$100B-$500B': return cap >= 0.1 && cap < 0.5;
          case '$10B-$100B': return cap >= 0.01 && cap < 0.1;
          case '<$10B': return cap < 0.01;
          default: return true;
        }
      });
    }

    // Apply P/E ratio filter
    if (selectedPE !== 'All') {
      filtered = filtered.filter(stock => {
        const pe = stock.peRatio;
        switch (selectedPE) {
          case '<10': return pe < 10;
          case '10-20': return pe >= 10 && pe <= 20;
          case '20-50': return pe > 20 && pe <= 50;
          case '>50': return pe > 50;
          default: return true;
        }
      });
    }

    // Apply dividend yield filter
    if (selectedDividend !== 'All') {
      filtered = filtered.filter(stock => {
        const div = stock.dividendYield;
        switch (selectedDividend) {
          case 'No Dividend': return div === 0;
          case '0-1%': return div > 0 && div <= 1;
          case '1-2%': return div > 1 && div <= 2;
          case '2-3%': return div > 2 && div <= 3;
          case '>3%': return div > 3;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredStocks(filtered);
  }, [searchTerm, selectedSector, selectedMarketCap, selectedPE, selectedDividend, sortConfig]);

  // Handle sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Symbol', 'Name', 'Sector', 'Price', 'Market Cap (T)', 'P/E Ratio', 'Dividend Yield (%)'];
    const data = filteredStocks.map(stock => [
      stock.symbol,
      stock.name,
      stock.sector,
      stock.price,
      stock.marketCap,
      stock.peRatio,
      stock.dividendYield
    ]);
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stock_screener_results.csv';
    link.click();
  };
  
  // Format number as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="screener-page">
      <div className="header-section">
        <div>
          <h1 className="page-title">Stock Screener</h1>
          <p className="subtitle">Find stocks matching your criteria</p>
        </div>
        <button className="export-btn" onClick={exportToCSV}>
          <Download size={18} />
          <span>Export Results</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="filters-container">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search symbols or names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters-section">
          <div className="filter-row">
            <div className="filter-group">
              <label>Sector</label>
              <div className="filter-options">
                {sectors.map(sector => (
                  <div 
                    key={sector}
                    className={`filter-chip ${selectedSector === sector ? 'active' : ''}`}
                    onClick={() => setSelectedSector(sector)}
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="filter-row">
            <div className="filter-group">
              <label>Market Cap</label>
              <div className="filter-options">
                {marketCapOptions.map(option => (
                  <div 
                    key={option}
                    className={`filter-chip ${selectedMarketCap === option ? 'active' : ''}`}
                    onClick={() => setSelectedMarketCap(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="filter-row multi-filter">
            <div className="filter-group">
              <label>P/E Ratio</label>
              <div className="filter-options">
                {peRatioOptions.map(option => (
                  <div 
                    key={option}
                    className={`filter-chip ${selectedPE === option ? 'active' : ''}`}
                    onClick={() => setSelectedPE(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <label>Dividend Yield</label>
              <div className="filter-options">
                {dividendOptions.map(option => (
                  <div 
                    key={option}
                    className={`filter-chip ${selectedDividend === option ? 'active' : ''}`}
                    onClick={() => setSelectedDividend(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="results-section">
        <div className="results-header">
          <span>Showing {filteredStocks.length} stocks</span>
        </div>
        
        <div className="table-container">
          <table className="stock-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('symbol')}>
                  <div className="th-content">
                    Symbol
                    <ArrowUpDown size={14} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => requestSort('name')}>
                  <div className="th-content">
                    Name
                    <ArrowUpDown size={14} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => requestSort('sector')}>
                  <div className="th-content">
                    Sector
                    <ArrowUpDown size={14} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => requestSort('price')} className="text-right">
                  <div className="th-content justify-end">
                    Price
                    <ArrowUpDown size={14} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => requestSort('marketCap')} className="text-right">
                  <div className="th-content justify-end">
                    Market Cap
                    <ArrowUpDown size={14} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => requestSort('peRatio')} className="text-right">
                  <div className="th-content justify-end">
                    P/E Ratio
                    <ArrowUpDown size={14} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => requestSort('dividendYield')} className="text-right">
                  <div className="th-content justify-end">
                    Dividend Yield
                    <ArrowUpDown size={14} className="sort-icon" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="stock-row">
                  <td className="font-medium">{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>{stock.sector}</td>
                  <td className="text-right">{formatCurrency(stock.price)}</td>
                  <td className="text-right">{stock.marketCap.toFixed(2)}T</td>
                  <td className="text-right">{stock.peRatio.toFixed(1)}</td>
                  <td className="text-right">{stock.dividendYield}%</td>
                </tr>
              ))}
              {filteredStocks.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    No stocks match your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Screener;
