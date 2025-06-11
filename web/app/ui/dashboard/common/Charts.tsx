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
  BarChart,
  Bar,
} from "recharts";
import type { barChartType, chartType, pieDataType } from "./types";
import { getTruncatedMoney } from "../utils";
import { colors } from "./data";
import { GoDotFill } from "react-icons/go";
import type { metricType } from "../types";

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

const BarGraph = ({
  data,
  metrics,
  map,
  left = 50,
  right = 50,
  width = 600,
  noTooltip,
}: {
  data: barChartType[];
  metrics: metricType[];
  map: { [key: string]: string };
  left?: number;
  right?: number;
  width?: number;
  noTooltip?: boolean;
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
          <p className="text-xs font-medium mb-1">{`${payload[0].payload.fiscal_year}`}</p>
          {payload.map((p: any, index: number) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <GoDotFill size={15} color={p.fill} />
                <p className="text-xs font-light">{map[p.name]}</p>
                <p className="text-xs font-light">{`${p.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${!noTooltip ? "Birr" : ""}`}</p>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={width}
        height={500}
        data={data}
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
        {Object.keys(data[0])
          .slice(1)
          .map((d, index) => {
            const m = metrics.find((m) => m.name === d);
            const idx = m ? metrics.indexOf(m) : 0;
            const barColor = colors[idx];

            return (
              <Bar
                key={index}
                type="monotone"
                dataKey={d}
                fill={barColor}
                barSize={Math.max(10, 250 / Object.keys(data[0]).length)}
              />
            );
          })}
        <XAxis
          scale="point"
          padding={{ left: left, right: right }}
          dataKey="fiscal_year"
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
      </BarChart>
    </ResponsiveContainer>
  );
};

export { AreaGraph, PieGraph, BarGraph };
