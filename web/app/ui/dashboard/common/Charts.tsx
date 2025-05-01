/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import type { dataType } from "./types";

const AreaGraph = ({
  toolTipTitle,
  data,
}: {
  toolTipTitle: string;
  data: dataType[];
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
          <p className="text-xs font-medium mb-1">{`${payload[0].payload.date}, ${payload[0].payload.year}`}</p>
          <p className="text-xs font-light">{`${payload[0].value} ${toolTipTitle}`}</p>
        </div>
      );
    }
  };

  const graphData = data.map((d) => {
    const newDate = format(d.date, "MMM d");
    const newYear = format(d.date, "yyyy");
    return { ...d, date: newDate, year: newYear };
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
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export { AreaGraph };
