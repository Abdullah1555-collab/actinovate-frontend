
import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock stock data
const stocksData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.68,
    change: 1.23,
    changePercent: 0.67,
    volume: "52.4M",
    marketCap: "2.89T",
    peRatio: "28.5",
    revenue: "$394.3B",
    nextReportDate: "Apr 25, 2024",
    rsi: "56.78",
    movingAverage50: "$178.45",
    news: [
      {
        title: 'Apple Announces New Product Line',
        timeAgo: '2 hours ago'
      },
      {
        title: 'Q1 Earnings Beat Expectations',
        timeAgo: '1 day ago'
      }
    ]
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 328.79,
    change: 4.23,
    changePercent: 1.30,
    volume: "35.2M",
    marketCap: "2.45T",
    peRatio: "32.1",
    revenue: "$211.9B",
    nextReportDate: "May 2, 2024",
    rsi: "62.34",
    movingAverage50: "$315.21",
    news: [
      {
        title: 'Microsoft Cloud Revenue Surges',
        timeAgo: '5 hours ago'
      },
      {
        title: 'New AI Features Announced for Office Suite',
        timeAgo: '3 days ago'
      }
    ]
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 134.99,
    change: -0.98,
    changePercent: -0.72,
    volume: "28.1M",
    marketCap: "1.70T",
    peRatio: "25.7",
    revenue: "$307.4B",
    nextReportDate: "May 10, 2024",
    rsi: "48.92",
    movingAverage50: "$138.75",
    news: [
      {
        title: 'Google Search Updates Algorithm',
        timeAgo: '1 day ago'
      },
      {
        title: 'YouTube Premium Subscribers Reach New Milestone',
        timeAgo: '4 days ago'
      }
    ]
  }
];

// Enhanced stock performance data for a more realistic chart
const performanceData = [
  { year: '2019', value: 100 },
  { year: '2020', value: 120 },
  { year: '2021', value: 180 },
  { year: '2022', value: 150 },
  { year: '2023', value: 200 },
];

const Stocks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleBackClick = () => {
    setSelectedStock(null);
  };

  const filteredStocks = stocksData.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If a stock is selected, show the detailed view
  if (selectedStock) {
    return (
      <div className="animate-fadeIn">
        {/* Stock Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackClick}
            className="mr-4 p-1 text-muted-foreground hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="mr-4">
            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-muted-foreground font-semibold">
              {selectedStock.symbol.substring(0, 1)}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{selectedStock.symbol}</h1>
            <p className="text-muted-foreground">{selectedStock.name}</p>
          </div>
          
          <div className="ml-auto text-right">
            <div className="text-3xl font-bold">${selectedStock.price.toFixed(2)}</div>
            <div className={`${selectedStock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
              {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Tabs for different content */}
        <Tabs defaultValue="chart">
          <TabsList className="mb-6 inline-flex bg-muted rounded-md">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          
          {/* Chart Tab */}
          <TabsContent value="chart">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">5 Year Performance</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      ticks={['2019', '2020', '2021', '2022', '2023']}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      domain={[0, 'dataMax + 20']}
                      ticks={[0, 50, 100, 150, 200]}
                    />
                    <Tooltip formatter={(value) => [`${value}`, 'Value']} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
          
          {/* Financial Tab */}
          <TabsContent value="financial">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <p className="text-muted-foreground text-sm">Market Cap</p>
                  <p className="text-xl font-semibold">{selectedStock.marketCap}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">P/E Ratio</p>
                  <p className="text-xl font-semibold">{selectedStock.peRatio}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Revenue (TTM)</p>
                  <p className="text-xl font-semibold">{selectedStock.revenue}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Next Report Date</p>
                  <p className="text-xl font-semibold">{selectedStock.nextReportDate}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Technical Tab */}
          <TabsContent value="technical">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Technical Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div>
                  <p className="text-muted-foreground text-sm">RSI (14)</p>
                  <p className="text-xl font-semibold">{selectedStock.rsi}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Moving Average (50)</p>
                  <p className="text-xl font-semibold">{selectedStock.movingAverage50}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* News Tab */}
          <TabsContent value="news">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Latest News</h3>
              <div className="space-y-4">
                {selectedStock.news.map((news, index) => (
                  <div key={index} className={index < selectedStock.news.length - 1 ? "pb-4 border-b border-border" : ""}>
                    <h4 className="font-medium hover:text-primary cursor-pointer">{news.title}</h4>
                    <p className="text-sm text-muted-foreground">{news.timeAgo}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Main stocks list view
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

      <div className="table-container overflow-x-auto">
        <table className="stock-table w-full rounded-lg overflow-hidden">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Symbol</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Price</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Change</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Volume</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => handleStockSelect(stock)}
                className="cursor-pointer hover:bg-muted/50 border-b border-border transition-colors"
              >
                <td className="px-4 py-4 font-medium">{stock.symbol}</td>
                <td className="px-4 py-4 text-muted-foreground">{stock.name}</td>
                <td className="px-4 py-4 text-right">${stock.price.toFixed(2)}</td>
                <td className={`px-4 py-4 text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                  {' '}
                  ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </td>
                <td className="px-4 py-4 text-right text-muted-foreground">{stock.volume}</td>
                <td className="px-4 py-4 text-right text-muted-foreground">{stock.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stocks;
