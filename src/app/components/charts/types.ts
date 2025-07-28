// types.ts for shared types
export interface ChartDataItem {
  source: string;
  value: number;
  fill?: string;
}

export interface LineChartDataItem {
  month: string;
  revenue: number;
  target: number;
}

export interface BarChartDataItem {
  day: string;
  active: number;
  new: number;
}

export interface PieChartProps {
  data: ChartDataItem[];
}

export interface LineChartProps {
  data: LineChartDataItem[];
}

export interface BarChartProps {
  data: BarChartDataItem[];
}