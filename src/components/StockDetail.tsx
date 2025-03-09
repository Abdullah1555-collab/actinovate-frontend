
import React from 'react';
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

// Financial metrics
const financialData = {
  marketCap: "$2.89T",
  peRatio: "28.5",
  revenue: "$394.3B",
  nextReportDate: "Apr 25, 2024",
  dividendYield: "0.53%",
  weekRange: "$142.65 - $199.62",
  eps: "$6.42",
  profitMargin: "25.31%"
};

// Technical indicators
const technicalData = {
  rsi: "56.78",
  movingAvg50: "$178.45",
  movingAvg200: "$169.23",
  beta: "1.32",
  avgVolume: "57.8M",
  relativeVolume: "0.95",
  macd: "1.45",
  atr: "3.24"
};

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
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex items-center mr-4">
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 font-semibold">
            {stock.symbol.substring(0, 1)}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">{stock.symbol}</h1>
          <p className="text-muted-foreground">{stock.name}</p>
        </div>
        
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold">{formatCurrency(stock.price)}</div>
          <div className={`${stock.changePercent >= 0 ? 'text-success' : 'text-destructive'} text-sm font-medium`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="border-b border-gray-200">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">5 Year Performance</h3>
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
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="financial" className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Financial Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <p className="text-muted-foreground text-sm">Market Cap</p>
              <p className="text-xl font-semibold">{financialData.marketCap}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">P/E Ratio</p>
              <p className="text-xl font-semibold">{financialData.peRatio}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Revenue (TTM)</p>
              <p className="text-xl font-semibold">{financialData.revenue}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Next Report Date</p>
              <p className="text-xl font-semibold">{financialData.nextReportDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Dividend Yield</p>
              <p className="text-xl font-semibold">{financialData.dividendYield}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">52 Week Range</p>
              <p className="text-xl font-semibold">{financialData.weekRange}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">EPS (TTM)</p>
              <p className="text-xl font-semibold">{financialData.eps}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Profit Margin</p>
              <p className="text-xl font-semibold">{financialData.profitMargin}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Technical Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <p className="text-muted-foreground text-sm">RSI (14)</p>
              <p className="text-xl font-semibold">{technicalData.rsi}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Moving Average (50)</p>
              <p className="text-xl font-semibold">{technicalData.movingAvg50}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Moving Average (200)</p>
              <p className="text-xl font-semibold">{technicalData.movingAvg200}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Beta (5 Year)</p>
              <p className="text-xl font-semibold">{technicalData.beta}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Average Volume</p>
              <p className="text-xl font-semibold">{technicalData.avgVolume}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Relative Volume</p>
              <p className="text-xl font-semibold">{technicalData.relativeVolume}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">MACD</p>
              <p className="text-xl font-semibold">{technicalData.macd}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">ATR (14)</p>
              <p className="text-xl font-semibold">{technicalData.atr}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="news" className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-6">Latest News</h3>
          <div className="space-y-4">
            {newsData.map((news, index) => (
              <div key={index} className={index < newsData.length - 1 ? "pb-4 border-b border-border" : ""}>
                <h4 className="font-medium hover:text-primary cursor-pointer">{news.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{news.timeAgo}</p>
                <p className="text-sm text-muted-foreground">{news.content}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetail;
