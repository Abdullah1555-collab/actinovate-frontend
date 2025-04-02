
import React from 'react';

// Technical indicators matching the provided image
const technicalData = {
  rsi: "56.78",
  movingAverage50: "$178.45"
};

const TechnicalData: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
      <h3 className="text-xl font-bold mb-6 dark:text-white">Technical Indicators</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">RSI (14)</p>
          <p className="text-xl font-semibold dark:text-white">{technicalData.rsi}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Moving Average (50)</p>
          <p className="text-xl font-semibold dark:text-white">{technicalData.movingAverage50}</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalData;
