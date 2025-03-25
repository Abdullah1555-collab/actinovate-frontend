
import React from 'react';

// Financial metrics with expanded data
const financialData = {
  tickerName: "AAPL",
  price: "$182.68",
  marketCap: "$2.89T",
  revenue: "$394.3B",
  peRatio: "28.5",
  revenue2025: "$425.7B (est.)",
  revenue2024: "$409.2B (est.)",
  revenue2023: "$394.3B",
  netProfit: "$96.9B",
  netProfitPercentage: "24.6%",
  revenueGrowthY1: "+6.7%",
  revenueGrowthY2: "+8.2%",
  revenueGrowthY3: "+5.3%",
  dividendYield: "0.53%",
  basicEPS: "$6.28",
  dilutedEPS: "$6.14",
  sector: "Technology",
  industry: "Consumer Electronics",
  foundedYear: "1976",
  nextReportDate: "Apr 25, 2024"
};

const FinancialData: React.FC = () => {
  return (
    <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-foreground">Financial Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Ticker Name</p>
          <p className="text-xl font-semibold text-foreground">{financialData.tickerName}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Price</p>
          <p className="text-xl font-semibold text-foreground">{financialData.price}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Market Cap</p>
          <p className="text-xl font-semibold text-foreground">{financialData.marketCap}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Revenue</p>
          <p className="text-xl font-semibold text-foreground">{financialData.revenue}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">P/E Ratio</p>
          <p className="text-xl font-semibold text-foreground">{financialData.peRatio}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">2025 Revenue</p>
          <p className="text-xl font-semibold text-foreground">{financialData.revenue2025}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">2024 Revenue</p>
          <p className="text-xl font-semibold text-foreground">{financialData.revenue2024}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">2023 Revenue</p>
          <p className="text-xl font-semibold text-foreground">{financialData.revenue2023}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Net Profit</p>
          <p className="text-xl font-semibold text-foreground">{financialData.netProfit}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Net Profit (%)</p>
          <p className="text-xl font-semibold text-foreground">{financialData.netProfitPercentage}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Revenue Growth (YOY) - Y1</p>
          <p className="text-xl font-semibold text-foreground">{financialData.revenueGrowthY1}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Revenue Growth (YOY) - Y2</p>
          <p className="text-xl font-semibold text-foreground">{financialData.revenueGrowthY2}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Revenue Growth (YOY) - Y3</p>
          <p className="text-xl font-semibold text-foreground">{financialData.revenueGrowthY3}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Dividend Yield</p>
          <p className="text-xl font-semibold text-foreground">{financialData.dividendYield}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Basic EPS</p>
          <p className="text-xl font-semibold text-foreground">{financialData.basicEPS}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Diluted EPS</p>
          <p className="text-xl font-semibold text-foreground">{financialData.dilutedEPS}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Sector</p>
          <p className="text-xl font-semibold text-foreground">{financialData.sector}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Industry</p>
          <p className="text-xl font-semibold text-foreground">{financialData.industry}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Founded Year</p>
          <p className="text-xl font-semibold text-foreground">{financialData.foundedYear}</p>
        </div>
        <div className="bg-secondary/30 p-4 rounded-lg border border-border">
          <p className="text-muted-foreground text-sm">Next Report Date</p>
          <p className="text-xl font-semibold text-foreground">{financialData.nextReportDate}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialData;
