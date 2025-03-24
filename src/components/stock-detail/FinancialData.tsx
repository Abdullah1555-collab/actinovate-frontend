
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
    <div className="p-6 bg-white rounded-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Financial Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
        <div>
          <p className="text-gray-500 text-sm">Ticker Name</p>
          <p className="text-xl font-semibold">{financialData.tickerName}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Price</p>
          <p className="text-xl font-semibold">{financialData.price}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Market Cap</p>
          <p className="text-xl font-semibold">{financialData.marketCap}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Revenue</p>
          <p className="text-xl font-semibold">{financialData.revenue}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">P/E Ratio</p>
          <p className="text-xl font-semibold">{financialData.peRatio}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">2025 Revenue</p>
          <p className="text-xl font-semibold">{financialData.revenue2025}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">2024 Revenue</p>
          <p className="text-xl font-semibold">{financialData.revenue2024}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">2023 Revenue</p>
          <p className="text-xl font-semibold">{financialData.revenue2023}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Net Profit</p>
          <p className="text-xl font-semibold">{financialData.netProfit}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Net Profit (%)</p>
          <p className="text-xl font-semibold">{financialData.netProfitPercentage}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Revenue Growth (YOY) - Y1</p>
          <p className="text-xl font-semibold">{financialData.revenueGrowthY1}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Revenue Growth (YOY) - Y2</p>
          <p className="text-xl font-semibold">{financialData.revenueGrowthY2}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Revenue Growth (YOY) - Y3</p>
          <p className="text-xl font-semibold">{financialData.revenueGrowthY3}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Dividend Yield</p>
          <p className="text-xl font-semibold">{financialData.dividendYield}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Basic EPS</p>
          <p className="text-xl font-semibold">{financialData.basicEPS}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Diluted EPS</p>
          <p className="text-xl font-semibold">{financialData.dilutedEPS}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Sector</p>
          <p className="text-xl font-semibold">{financialData.sector}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Industry</p>
          <p className="text-xl font-semibold">{financialData.industry}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Founded Year</p>
          <p className="text-xl font-semibold">{financialData.foundedYear}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Next Report Date</p>
          <p className="text-xl font-semibold">{financialData.nextReportDate}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialData;
