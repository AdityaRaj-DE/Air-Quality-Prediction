import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from "recharts";

const AQI_BANDS = [
  { min: 0, max: 50, label: "Good", color: "#4ade80" },
  { min: 51, max: 100, label: "Moderate", color: "#fde047" },
  { min: 101, max: 200, label: "Poor", color: "#fb923c" },
  { min: 201, max: 300, label: "Very Poor", color: "#f87171" },
  { min: 301, max: 500, label: "Severe", color: "#c084fc" }
];

const AQITrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-zinc-500">
        No historical data available
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#242424] rounded-xl shadow p-4">
      <h2 className="text-lg font-bold mb-2">
        AQI Trend with Health Categories
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          
          {/* AQI CATEGORY BANDS */}
          {AQI_BANDS.map((band, i) => (
            <ReferenceArea
              key={i}
              y1={band.min}
              y2={band.max}
              fill={band.color}
              fillOpacity={0.15}
            />
          ))}

          <XAxis
            dataKey="time"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString()
            }
          />

          <YAxis
            domain={[0, 500]}
            tickCount={6}
          />

          <Tooltip
            formatter={(value) => [`AQI ${value}`, "Predicted AQI"]}
            labelFormatter={(t) =>
              new Date(t).toLocaleString()
            }
          />

          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#000"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-3 mt-3 text-sm">
        {AQI_BANDS.map((band) => (
          <div key={band.label} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ backgroundColor: band.color }}
            />
            <span>{band.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AQITrendChart;
