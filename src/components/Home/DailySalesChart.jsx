import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "11am", sales: 1000 },
  { name: "12am", sales: 2200 },
  { name: "1pm", sales: 3000 },
  { name: "2pm", sales: 1500 },
  { name: "3pm", sales: 2600 },
  { name: "4pm", sales: 4000 },
  { name: "5pm", sales: 3000 },
  { name: "6pm", sales: 2000 },
  { name: "7pm", sales: 3200 },
];

const DailySalesChart = () => {
  return (
    <div className="flex flex-col items-center lg:w-[70%] w-full shadow-lg ">
      <h1 className="text-[20px] mb-3 mt-1">Daily Sales</h1>
      <ResponsiveContainer width="95%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#ff0202" />
          <Area
            dataKey="sales"
            stroke="#ff0202"
            fill="#ff0202"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySalesChart;
