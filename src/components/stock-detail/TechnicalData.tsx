
import React from 'react';

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

const TechnicalData: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
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
    </div>
  );
};

export default TechnicalData;
