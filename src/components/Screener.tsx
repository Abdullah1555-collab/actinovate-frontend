
import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Download, Filter, Sliders, X, Plus, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock data for the screener
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 185.92, marketCap: 2.94, peRatio: 30.5, dividendYield: 0.5, beta: 1.23, volume: '62.3M', change: '+1.23%' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', price: 328.79, marketCap: 2.44, peRatio: 34.2, dividendYield: 0.8, beta: 0.95, volume: '48.7M', change: '+0.87%' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 1450.16, marketCap: 1.84, peRatio: 25.1, dividendYield: 0, beta: 1.08, volume: '35.2M', change: '-0.45%' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', sector: 'Consumer Cyclical', price: 3120.50, marketCap: 1.59, peRatio: 60.8, dividendYield: 0, beta: 1.24, volume: '41.8M', change: '+2.15%' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', sector: 'Automotive', price: 273.58, marketCap: 0.87, peRatio: 75.2, dividendYield: 0, beta: 1.76, volume: '58.4M', change: '-1.65%' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', price: 435.10, marketCap: 1.07, peRatio: 62.1, dividendYield: 0.1, beta: 1.54, volume: '45.9M', change: '+3.45%' },
  { symbol: 'META', name: 'Meta Platforms, Inc.', sector: 'Technology', price: 297.80, marketCap: 0.76, peRatio: 28.4, dividendYield: 0.5, beta: 1.31, volume: '32.6M', change: '+0.63%' },
  { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Defensive', price: 156.72, marketCap: 0.42, peRatio: 26.5, dividendYield: 1.4, beta: 0.64, volume: '18.3M', change: '+0.25%' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', price: 167.15, marketCap: 0.40, peRatio: 15.2, dividendYield: 3.0, beta: 0.57, volume: '12.7M', change: '-0.32%' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services', price: 144.23, marketCap: 0.42, peRatio: 11.7, dividendYield: 2.5, beta: 1.12, volume: '15.6M', change: '+1.05%' },
  { symbol: 'V', name: 'Visa Inc.', sector: 'Financial Services', price: 233.45, marketCap: 0.49, peRatio: 33.8, dividendYield: 0.7, beta: 0.96, volume: '11.2M', change: '+0.41%' },
  { symbol: 'PG', name: 'Procter & Gamble Co.', sector: 'Consumer Defensive', price: 156.32, marketCap: 0.37, peRatio: 25.6, dividendYield: 2.4, beta: 0.42, volume: '9.8M', change: '+0.18%' },
  { symbol: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Healthcare', price: 456.78, marketCap: 0.43, peRatio: 21.3, dividendYield: 1.3, beta: 0.68, volume: '8.5M', change: '+0.73%' },
  { symbol: 'HD', name: 'Home Depot Inc.', sector: 'Consumer Cyclical', price: 325.89, marketCap: 0.33, peRatio: 23.7, dividendYield: 2.3, beta: 1.05, volume: '7.9M', change: '-0.53%' },
  { symbol: 'BAC', name: 'Bank of America Corp.', sector: 'Financial Services', price: 34.56, marketCap: 0.27, peRatio: 11.2, dividendYield: 2.7, beta: 1.38, volume: '14.3M', change: '+0.87%' },
];

// Filter options
const sectors = ['All', 'Technology', 'Financial Services', 'Healthcare', 'Consumer Cyclical', 'Consumer Defensive', 'Automotive'];
const industries = ['All', 'Software', 'Hardware', 'Semiconductors', 'Banking', 'Insurance', 'Pharmaceuticals', 'Retail', 'Automotive', 'Energy'];
const marketCapOptions = ['All', '>$1T', '$500B-$1T', '$100B-$500B', '$10B-$100B', '<$10B'];
const peRatioOptions = ['All', '<10', '10-20', '20-50', '>50'];
const dividendOptions = ['All', 'No Dividend', '0-1%', '1-2%', '2-3%', '>3%'];

const Screener: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedMarketCap, setSelectedMarketCap] = useState('All');
  const [minPE, setMinPE] = useState('');
  const [maxPE, setMaxPE] = useState('');
  const [minDividend, setMinDividend] = useState('');
  const [maxDividend, setMaxDividend] = useState('');
  const [foundedYear, setFoundedYear] = useState('');
  const [netProfit, setNetProfit] = useState('');
  const [netProfitPercent, setNetProfitPercent] = useState('');
  const [revenue, setRevenue] = useState('');
  const [basicEPS, setBasicEPS] = useState('');
  const [dilutedEPS, setDilutedEPS] = useState('');
  const [sma10, setSma10] = useState('');
  const [sma20, setSma20] = useState('');
  const [sma50, setSma50] = useState('');
  const [sma200, setSma200] = useState('');
  const [beta1Year, setBeta1Year] = useState('');
  const [beta5Year, setBeta5Year] = useState('');
  const [relativeVolume, setRelativeVolume] = useState('');
  const [psRatio, setPsRatio] = useState('');
  const [pbRatio, setPbRatio] = useState('');
  const [pcfRatio, setPcfRatio] = useState('');
  const [rsi, setRsi] = useState('');
  const [momentum, setMomentum] = useState('');
  
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

    // Apply price range filter
    if (minPrice) {
      filtered = filtered.filter(stock => stock.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter(stock => stock.price <= parseFloat(maxPrice));
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
    if (minPE) {
      filtered = filtered.filter(stock => stock.peRatio >= parseFloat(minPE));
    }
    
    if (maxPE) {
      filtered = filtered.filter(stock => stock.peRatio <= parseFloat(maxPE));
    }

    // Apply dividend yield filter
    if (minDividend) {
      filtered = filtered.filter(stock => stock.dividendYield >= parseFloat(minDividend));
    }
    
    if (maxDividend) {
      filtered = filtered.filter(stock => stock.dividendYield <= parseFloat(maxDividend));
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
  }, [searchTerm, selectedSector, minPrice, maxPrice, selectedMarketCap, minPE, maxPE, minDividend, maxDividend, sortConfig]);

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
    const headers = ['Symbol', 'Name', 'Sector', 'Price', 'Market Cap (T)', 'P/E Ratio', 'Dividend Yield (%)', 'Beta', 'Volume', 'Change'];
    const data = filteredStocks.map(stock => [
      stock.symbol,
      stock.name,
      stock.sector,
      stock.price,
      stock.marketCap,
      stock.peRatio,
      stock.dividendYield,
      stock.beta,
      stock.volume,
      stock.change
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

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSector('All');
    setSelectedIndustry('All');
    setMinPrice('');
    setMaxPrice('');
    setSelectedMarketCap('All');
    setMinPE('');
    setMaxPE('');
    setMinDividend('');
    setMaxDividend('');
    setFoundedYear('');
    setNetProfit('');
    setNetProfitPercent('');
    setRevenue('');
    setBasicEPS('');
    setDilutedEPS('');
    setSma10('');
    setSma20('');
    setSma50('');
    setSma200('');
    setBeta1Year('');
    setBeta5Year('');
    setRelativeVolume('');
    setPsRatio('');
    setPbRatio('');
    setPcfRatio('');
    setRsi('');
    setMomentum('');
  };

  return (
    <div className="screener-page">
      <div className="header-section">
        <div>
          <h1 className="page-title">Stock Screener</h1>
          <p className="subtitle">Filter and analyze stocks based on various metrics</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setFilterOpen(!filterOpen)} variant="outline" className="mobile-filter-toggle">
            <Filter size={18} className="mr-2" />
            <span>Filters</span>
          </Button>
          <Button onClick={exportToCSV} className="export-btn">
            <Download size={18} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="screener-layout">
        {/* Filter Sidebar */}
        <div className={`filter-sidebar ${filterOpen ? 'open' : 'closed'}`}>
          <div className="filter-sidebar-header">
            <h3 className="text-lg font-semibold">Filters</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-muted-foreground"
              >
                Reset
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFilterOpen(false)}
                className="lg:hidden"
              >
                <X size={18} />
              </Button>
            </div>
          </div>

          <div className="filter-sidebar-content">
            <div className="filter-group">
              <label className="filter-label">Search Ticker:</label>
              <Input
                type="text"
                placeholder="Enter Ticker Symbol"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range:</label>
              <div className="filter-row">
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="filter-input-half"
                />
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="filter-input-half"
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Sector:</label>
              <select 
                className="filter-select"
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Industry:</label>
              <select 
                className="filter-select"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Founded Year:</label>
              <Input
                type="number"
                placeholder="Enter Founded Year"
                value={foundedYear}
                onChange={(e) => setFoundedYear(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Market Cap:</label>
              <select 
                className="filter-select"
                value={selectedMarketCap}
                onChange={(e) => setSelectedMarketCap(e.target.value)}
              >
                {marketCapOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Net Profit:</label>
              <Input
                type="text"
                placeholder="Enter Net Profit"
                value={netProfit}
                onChange={(e) => setNetProfit(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Net Profit (%):</label>
              <Input
                type="text"
                placeholder="Enter Net Profit %"
                value={netProfitPercent}
                onChange={(e) => setNetProfitPercent(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Revenue:</label>
              <Input
                type="text"
                placeholder="Enter Revenue"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Price/Earning (P/E):</label>
              <div className="filter-row">
                <Input
                  type="number"
                  placeholder="Min P/E"
                  value={minPE}
                  onChange={(e) => setMinPE(e.target.value)}
                  className="filter-input-half"
                />
                <Input
                  type="number"
                  placeholder="Max P/E"
                  value={maxPE}
                  onChange={(e) => setMaxPE(e.target.value)}
                  className="filter-input-half"
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Dividend Yield:</label>
              <div className="filter-row">
                <Input
                  type="number"
                  placeholder="Min Yield"
                  value={minDividend}
                  onChange={(e) => setMinDividend(e.target.value)}
                  className="filter-input-half"
                />
                <Input
                  type="number"
                  placeholder="Max Yield"
                  value={maxDividend}
                  onChange={(e) => setMaxDividend(e.target.value)}
                  className="filter-input-half"
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Basic EPS:</label>
              <Input
                type="text"
                placeholder="Enter Basic EPS"
                value={basicEPS}
                onChange={(e) => setBasicEPS(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Diluted EPS:</label>
              <Input
                type="text"
                placeholder="Enter Diluted EPS"
                value={dilutedEPS}
                onChange={(e) => setDilutedEPS(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">SMA (10):</label>
              <Input
                type="text"
                placeholder="Enter SMA (10)"
                value={sma10}
                onChange={(e) => setSma10(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">SMA (20):</label>
              <Input
                type="text"
                placeholder="Enter SMA (20)"
                value={sma20}
                onChange={(e) => setSma20(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">SMA (50):</label>
              <Input
                type="text"
                placeholder="Enter SMA (50)"
                value={sma50}
                onChange={(e) => setSma50(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">SMA (200):</label>
              <Input
                type="text"
                placeholder="Enter SMA (200)"
                value={sma200}
                onChange={(e) => setSma200(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Beta (1 Year):</label>
              <Input
                type="text"
                placeholder="Enter Beta (1 Year)"
                value={beta1Year}
                onChange={(e) => setBeta1Year(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Beta (5 Year):</label>
              <Input
                type="text"
                placeholder="Enter Beta (5 Year)"
                value={beta5Year}
                onChange={(e) => setBeta5Year(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Relative Volume:</label>
              <Input
                type="text"
                placeholder="Enter Relative Volume"
                value={relativeVolume}
                onChange={(e) => setRelativeVolume(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">P/S Ratio:</label>
              <Input
                type="text"
                placeholder="Enter P/S Ratio"
                value={psRatio}
                onChange={(e) => setPsRatio(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">P/B Ratio:</label>
              <Input
                type="text"
                placeholder="Enter P/B Ratio"
                value={pbRatio}
                onChange={(e) => setPbRatio(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">P/CF Ratio:</label>
              <Input
                type="text"
                placeholder="Enter P/CF Ratio"
                value={pcfRatio}
                onChange={(e) => setPcfRatio(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">RSI:</label>
              <Input
                type="text"
                placeholder="Enter RSI"
                value={rsi}
                onChange={(e) => setRsi(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Momentum:</label>
              <Input
                type="text"
                placeholder="Enter Momentum"
                value={momentum}
                onChange={(e) => setMomentum(e.target.value)}
                className="filter-input"
              />
            </div>

            <Button className="apply-filters-btn w-full mt-4">
              Apply Filters
            </Button>
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
                      Dividend
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </th>
                  <th onClick={() => requestSort('beta')} className="text-right">
                    <div className="th-content justify-end">
                      Beta
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </th>
                  <th onClick={() => requestSort('volume')} className="text-right">
                    <div className="th-content justify-end">
                      Volume
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </th>
                  <th onClick={() => requestSort('change')} className="text-right">
                    <div className="th-content justify-end">
                      Change
                      <ArrowUpDown size={14} className="sort-icon" />
                    </div>
                  </th>
                  <th className="text-center">
                    <div className="th-content justify-center">
                      Alert
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
                    <td className="text-right">{stock.beta}</td>
                    <td className="text-right">{stock.volume}</td>
                    <td className={`text-right ${stock.change.startsWith('+') ? 'profit' : 'loss'}`}>
                      {stock.change}
                    </td>
                    <td className="text-center">
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <BellRing size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredStocks.length === 0 && (
                  <tr>
                    <td colSpan={11} className="text-center py-8 text-muted-foreground">
                      No stocks match your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screener;
