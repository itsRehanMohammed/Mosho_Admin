import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Food", value: 1000 },
  { name: "Drink", value: 1500 },
  { name: "Others", value: 500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const IncomeChart = () => {
  return (
    <>
      <div className="flex flex-col items-center md:ml-20 shadow-lg p-5 rounded">
        <h1 className="text-[20px] text-center leading-none">
          Total Income <br />
          <span className="text-[30px] font-bold"> $3000 </span>
        </h1>
        <PieChart width={140} height={140}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <ul className="list-disc flex flex-row items-center justify-between">
          <li className="mx-3 text-[#0088FE]">
            <span className="text-black">Food</span>
          </li>
          <li className="mx-3 text-[#00C49F]">
            <span className="text-black">Drink</span>
          </li>
          <li className="mx-3 text-[#FFBB28]">
            <span className="text-black">Others</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IncomeChart;
