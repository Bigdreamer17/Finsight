/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { chartType, pieDataType } from "./types";
import { getTruncatedMoney } from "../utils";

const AreaGraph = ({
  toolTipTitle,
  data,
}: {
  toolTipTitle: string;
  data: chartType[];
}) => {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: any;
    payload?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#40404F] rounded-sm py-2 px-2.5">
          <p className="text-xs font-medium mb-1">{`${payload[0].payload.year}`}</p>
          <p className="text-xs font-light">{`${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${toolTipTitle}`}</p>
        </div>
      );
    }
  };

  const graphData = data.map((d) => {
    return { ...d, year: d.year };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={600}
        height={400}
        data={graphData}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        className="w-full"
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2EA3F8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2EA3F8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#40404F" fillOpacity={1} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#0BD28B"
          strokeWidth={2}
          fillOpacity={0.6}
          fill="#0BD28B80"
          activeDot={{
            stroke: "#FFF",
            fill: "#0BD28B",
            strokeWidth: 1,
            r: 3,
            fillOpacity: 1,
          }}
        />
        <XAxis
          dataKey="year"
          tickLine={false}
          className="text-[10px] font-light"
          tick={{ fill: "#cac4d0" }}
        />
        <YAxis
          type="number"
          orientation="right"
          domain={[
            0,
            (dataMax: number) => (dataMax === 0 ? 1 : Math.ceil(dataMax * 1.2)),
          ]}
          axisLine={false}
          tickLine={false}
          className="text-[10px] font-extralight"
          tick={{ fill: "#cac4d0" }}
          tickFormatter={getTruncatedMoney}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const PieGraph = ({ data }: { data: pieDataType[] }) => {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: any;
    payload?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#40404F] rounded-sm py-2 px-2.5">
          <p className="text-xs font-light">
            {`${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} of ${payload[0].name}`}
          </p>
        </div>
      );
    }
  };

  const colors = ["#3FFF00", "#FF0000"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={600} height={300}>
        <Pie data={data} dataKey="value" nameKey="name">
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index]}
              stroke="#2C2C35"
              strokeWidth={10}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export { AreaGraph, PieGraph };
