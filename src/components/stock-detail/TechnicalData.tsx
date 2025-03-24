
import React from 'react';

// Technical indicators with expanded data
const technicalData = {
  rsi: "56.78",
  movingAverage50: "$178.45",
  sma10: "$181.23",
  sma20: "$179.84",
  sma50: "$178.45",
  sma200: "$165.32",
  beta1Year: "1.12",
  beta5Year: "1.08",
  relativeVolume: "1.24",
  priceToSales: "7.2",
  priceToBook: "34.5",
  priceToCash: "22.8",
  momentum: "+15.3%"
};

const TechnicalData: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Technical Indicators</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
        <div>
          <p className="text-gray-500 text-sm">RSI (14)</p>
          <p className="text-xl font-semibold">{technicalData.rsi}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Simple Moving Average (10)</p>
          <p className="text-xl font-semibold">{technicalData.sma10}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Simple Moving Average (20)</p>
          <p className="text-xl font-semibold">{technicalData.sma20}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Simple Moving Average (50)</p>
          <p className="text-xl font-semibold">{technicalData.sma50}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Simple Moving Average (200)</p>
          <p className="text-xl font-semibold">{technicalData.sma200}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Beta (1 Year)</p>
          <p className="text-xl font-semibold">{technicalData.beta1Year}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Beta (5 Year)</p>
          <p className="text-xl font-semibold">{technicalData.beta5Year}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Relative Volume</p>
          <p className="text-xl font-semibold">{technicalData.relativeVolume}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Price to Sales Ratio (P/S)</p>
          <p className="text-xl font-semibold">{technicalData.priceToSales}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Price to Book Ratio (P/B)</p>
          <p className="text-xl font-semibold">{technicalData.priceToBook}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Price to Cash (P/CF)</p>
          <p className="text-xl font-semibold">{technicalData.priceToCash}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Momentum</p>
          <p className="text-xl font-semibold">{technicalData.momentum}</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalData;
