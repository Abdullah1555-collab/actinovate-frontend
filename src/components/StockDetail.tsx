
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Enhanced stock performance data for a more realistic chart
const performanceData = [
  { year: '2019', value: 100 },
  { year: '2020 Q1', value: 85 },
  { year: '2020 Q2', value: 105 },
  { year: '2020 Q3', value: 120 },
  { year: '2020 Q4', value: 125 },
  { year: '2021 Q1', value: 140 },
  { year: '2021 Q2', value: 160 },
  { year: '2021 Q3', value: 180 },
  { year: '2021 Q4', value: 175 },
  { year: '2022 Q1', value: 165 },
  { year: '2022 Q2', value: 155 },
  { year: '2022 Q3', value: 150 },
  { year: '2022 Q4', value: 160 },
  { year: '2023 Q1', value: 170 },
  { year: '2023 Q2', value: 180 },
  { year: '2023 Q3', value: 190 },
  { year: '2023 Q4', value: 200 },
];

// Enhanced news data
const newsData = [
  {
    title: 'Apple Announces New Product Line',
    timeAgo: '2 hours ago',
    content: 'Apple unveiled its latest lineup of products, including updates to the iPhone, iPad, and MacBook series.'
  },
  {
    title: 'Q1 Earnings Beat Expectations',
    timeAgo: '1 day ago',
    content: 'Apple reported Q1 earnings of $1.52 per share, beating analysts\' expectations of $1.43 per share.'
  },
  {
    title: 'Apple Partners with AI Startup for New Features',
    timeAgo: '3 days ago',
    content: 'The tech giant announced a new partnership with an AI startup to enhance Siri and other AI features across its ecosystem.'
  },
  {
    title: 'Analysts Upgrade Stock to Buy Rating',
    timeAgo: '1 week ago',
    content: 'Several major analysts have upgraded Apple stock to a "Buy" rating, citing strong product demand and services growth.'
  }
];

interface StockDetailProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
  };
  onBack: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onBack }) => {
  const [activeTab, setActiveTab] = useState('chart');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <button 
          onClick={onBack}
          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">
            {stock.symbol.substring(0, 1)}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{stock.symbol}</h1>
            <p className="text-muted-foreground">{stock.name}</p>
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold">{formatCurrency(stock.price)}</div>
          <div className={`${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'} text-sm font-medium`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-background border border-input">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">5 Year Performance</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
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
                    />
                    <Tooltip formatter={(value) => [`${value}`, 'Value']} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4f46e5" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                <div>
                  <p className="text-muted-foreground mb-1">Market Cap</p>
                  <p className="text-xl font-semibold">$2.89T</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">P/E Ratio</p>
                  <p className="text-xl font-semibold">28.5</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Revenue (TTM)</p>
                  <p className="text-xl font-semibold">$394.3B</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Next Report Date</p>
                  <p className="text-xl font-semibold">Apr 25, 2024</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Dividend Yield</p>
                  <p className="text-xl font-semibold">0.53%</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">52 Week Range</p>
                  <p className="text-xl font-semibold">$142.65 - $199.62</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">EPS (TTM)</p>
                  <p className="text-xl font-semibold">$6.42</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Profit Margin</p>
                  <p className="text-xl font-semibold">25.31%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="technical" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Technical Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                <div>
                  <p className="text-muted-foreground mb-1">RSI (14)</p>
                  <p className="text-xl font-semibold">56.78</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Moving Average (50)</p>
                  <p className="text-xl font-semibold">$178.45</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Moving Average (200)</p>
                  <p className="text-xl font-semibold">$169.23</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Beta (5 Year)</p>
                  <p className="text-xl font-semibold">1.32</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Average Volume</p>
                  <p className="text-xl font-semibold">57.8M</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Relative Volume</p>
                  <p className="text-xl font-semibold">0.95</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">MACD</p>
                  <p className="text-xl font-semibold">1.45</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">ATR (14)</p>
                  <p className="text-xl font-semibold">3.24</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="news" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Latest News</h3>
              <div className="space-y-4">
                {newsData.map((news, index) => (
                  <div key={index} className={index < newsData.length - 1 ? "pb-4 border-b border-border" : ""}>
                    <h4 className="font-medium hover:text-primary cursor-pointer">{news.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{news.timeAgo}</p>
                    <p className="text-sm">{news.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetail;
