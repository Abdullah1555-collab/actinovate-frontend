
import React from 'react';

// Financial metrics matching the provided image
const financialData = {
  marketCap: "$2.89T",
  peRatio: "28.5",
  revenue: "$394.3B",
  nextReportDate: "Apr 25, 2024"
};

const FinancialData: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Financial Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <p className="text-gray-500 text-sm">Market Cap</p>
          <p className="text-xl font-semibold">{financialData.marketCap}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">P/E Ratio</p>
          <p className="text-xl font-semibold">{financialData.peRatio}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Revenue (TTM)</p>
          <p className="text-xl font-semibold">{financialData.revenue}</p>
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
