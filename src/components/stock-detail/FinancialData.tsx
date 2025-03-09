
import React from 'react';

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

const FinancialData: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
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
    </div>
  );
};

export default FinancialData;
