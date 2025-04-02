
import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

// Technical indicators with improved data
const technicalData = {
  rsi: "56.78",
  movingAverage50: "$178.45",
  macdSignal: "2.34",
  volatility: "1.8%"
};

// Helper function to determine if an indicator is bullish/bearish/neutral
const getIndicatorStatus = (indicator: string, type: 'rsi' | 'macd'): 'bullish' | 'bearish' | 'neutral' => {
  const value = parseFloat(indicator.replace('$', ''));
  
  if (type === 'rsi') {
    if (value > 70) return 'bearish';
    if (value < 30) return 'bullish';
    return 'neutral';
  } else { // macd
    if (value > 0) return 'bullish';
    if (value < 0) return 'bearish';
    return 'neutral';
  }
};

const TechnicalData: React.FC = () => {
  const rsiStatus = getIndicatorStatus(technicalData.rsi, 'rsi');
  const macdStatus = getIndicatorStatus(technicalData.macdSignal, 'macd');
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-500" />
        Technical Indicators
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="transition-transform duration-300 hover:scale-105">
          <p className="text-gray-500 dark:text-gray-400 text-sm">RSI (14)</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold dark:text-white">{technicalData.rsi}</p>
            {rsiStatus === 'bullish' && (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
            {rsiStatus === 'bearish' && (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {rsiStatus === 'bullish' ? 'Oversold - Potential buy signal' : 
              rsiStatus === 'bearish' ? 'Overbought - Potential sell signal' : 
              'Neutral momentum'}
          </p>
        </div>
        
        <div className="transition-transform duration-300 hover:scale-105">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Moving Average (50)</p>
          <p className="text-xl font-semibold dark:text-white">{technicalData.movingAverage50}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Support/resistance level</p>
        </div>
        
        <div className="transition-transform duration-300 hover:scale-105">
          <p className="text-gray-500 dark:text-gray-400 text-sm">MACD Signal</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold dark:text-white">{technicalData.macdSignal}</p>
            {macdStatus === 'bullish' && (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
            {macdStatus === 'bearish' && (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {macdStatus === 'bullish' ? 'Bullish crossover' : 
              macdStatus === 'bearish' ? 'Bearish crossover' : 
              'Neutral trend'}
          </p>
        </div>
        
        <div className="transition-transform duration-300 hover:scale-105">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Volatility (30D)</p>
          <p className="text-xl font-semibold dark:text-white">{technicalData.volatility}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Historical price fluctuation</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalData;
