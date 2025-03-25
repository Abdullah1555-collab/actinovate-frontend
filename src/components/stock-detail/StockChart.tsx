
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Area, AreaChart, ComposedChart } from 'recharts';

// Enhanced stock performance data for a more realistic chart with volume data
const performanceData = [
  { year: '2019', value: 100, volume: 1500, profit: 28 },
  { year: '2020', value: 120, volume: 2200, profit: 32 },
  { year: '2021', value: 180, volume: 3100, profit: 45 },
  { year: '2022', value: 150, volume: 2600, profit: 38 },
  { year: '2023', value: 200, volume: 3800, profit: 52 },
];

const StockChart: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'composed'>('area');
  
  // Define a custom gradient for the area chart
  const gradientId = "colorGradient";
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">5 Year Performance</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setChartType('line')}
            className={`px-3 py-1 text-sm rounded-md border ${chartType === 'line' 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-secondary text-secondary-foreground border-border'}`}
          >
            Line
          </button>
          <button 
            onClick={() => setChartType('area')}
            className={`px-3 py-1 text-sm rounded-md border ${chartType === 'area' 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-secondary text-secondary-foreground border-border'}`}
          >
            Area
          </button>
          <button 
            onClick={() => setChartType('composed')}
            className={`px-3 py-1 text-sm rounded-md border ${chartType === 'composed' 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-secondary text-secondary-foreground border-border'}`}
          >
            Combined
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' && (
              <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis 
                  dataKey="year" 
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                  tick={{ fill: 'var(--foreground)' }}
                  ticks={['2019', '2020', '2021', '2022', '2023']}
                />
                <YAxis 
                  axisLine={{ stroke: 'var(--border)' }} 
                  tickLine={false}
                  tick={{ fill: 'var(--foreground)' }}
                  domain={[0, 'dataMax + 50']}
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Value']} 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)'
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Stock Value"
                  stroke="#8884d8" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: "#8884d8", strokeWidth: 0 }}
                  activeDot={{ r: 8, fill: "#8884d8" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  name="Profit"
                  stroke="#82ca9d" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: "#82ca9d", strokeWidth: 0 }}
                  activeDot={{ r: 8, fill: "#82ca9d" }}
                />
              </LineChart>
            )}
            
            {chartType === 'area' && (
              <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis 
                  dataKey="year" 
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                  tick={{ fill: 'var(--foreground)' }}
                />
                <YAxis 
                  axisLine={{ stroke: 'var(--border)' }} 
                  tickLine={false}
                  tick={{ fill: 'var(--foreground)' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)'
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="Stock Value"
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  name="Profit"
                  stroke="#82ca9d" 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                />
              </AreaChart>
            )}
            
            {chartType === 'composed' && (
              <ComposedChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis 
                  dataKey="year" 
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                  tick={{ fill: 'var(--foreground)' }}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={{ stroke: 'var(--border)' }} 
                  tickLine={false}
                  tick={{ fill: 'var(--foreground)' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={{ stroke: 'var(--border)' }} 
                  tickLine={false}
                  tick={{ fill: 'var(--foreground)' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)'
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="value" 
                  name="Stock Value"
                  fill="url(#colorValue)" 
                  stroke="#8884d8"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="volume" 
                  name="Volume"
                  fill="#ff7300" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="profit" 
                  name="Profit"
                  stroke="#82ca9d" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#82ca9d", strokeWidth: 0 }}
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volume Bar Chart */}
      <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-foreground">Trading Volume</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis 
                dataKey="year" 
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
                tick={{ fill: 'var(--foreground)' }}
              />
              <YAxis 
                axisLine={{ stroke: 'var(--border)' }} 
                tickLine={false}
                tick={{ fill: 'var(--foreground)' }}
                domain={[0, 'dataMax + 500']}
              />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Volume']} 
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)'
                }}
                labelStyle={{ color: 'var(--foreground)' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
              <Bar 
                dataKey="volume" 
                name="Trading Volume"
                fill="url(#barGradient)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
