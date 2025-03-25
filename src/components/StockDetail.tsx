
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
    <div className="space-y-6 animate-fadeIn">
      <StockHeader stock={stock} onBack={onBack} />

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="mb-6 p-1 bg-muted/50 inline-flex rounded-md border border-border">
          <TabsTrigger value="chart" className="rounded-md text-foreground">Chart</TabsTrigger>
          <TabsTrigger value="financial" className="rounded-md text-foreground">Financial</TabsTrigger>
          <TabsTrigger value="technical" className="rounded-md text-foreground">Technical</TabsTrigger>
          <TabsTrigger value="news" className="rounded-md text-foreground">News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="block">
          <StockChart />
        </TabsContent>
        
        <TabsContent value="financial" className="block">
          <FinancialData />
        </TabsContent>
        
        <TabsContent value="technical" className="block">
          <TechnicalData />
        </TabsContent>
        
        <TabsContent value="news" className="block">
          <NewsData />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetail;
