
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StockHeader from './stock-detail/StockHeader';
import StockChart from './stock-detail/StockChart';
import FinancialData from './stock-detail/FinancialData';
import TechnicalData from './stock-detail/TechnicalData';
import NewsData from './stock-detail/NewsData';

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
  return (
    <div className="space-y-4 animate-fadeIn">
      <StockHeader stock={stock} onBack={onBack} />

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="w-auto inline-flex rounded-md bg-slate-50 p-1 shadow-sm mb-6 border border-gray-100">
          <TabsTrigger value="chart" className="rounded-md">Chart</TabsTrigger>
          <TabsTrigger value="financial" className="rounded-md">Financial</TabsTrigger>
          <TabsTrigger value="technical" className="rounded-md">Technical</TabsTrigger>
          <TabsTrigger value="news" className="rounded-md">News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart">
          <StockChart />
        </TabsContent>
        
        <TabsContent value="financial">
          <FinancialData />
        </TabsContent>
        
        <TabsContent value="technical">
          <TechnicalData />
        </TabsContent>
        
        <TabsContent value="news">
          <NewsData />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetail;
