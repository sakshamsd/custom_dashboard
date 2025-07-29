type ChartType = "LINE_CHART" | "BAR_CHART" | "PIE_CHART";

type ItemType = "numberCard" | "indicator" | "button" | ChartType;

interface ItemTypeConfig {
    w: number;
    h: number;
}

interface DashboardItemSettings {
    format: string | undefined;
    data: string;
    title?: string;
    value?: string | number;
    color?: string;
    label?: string;
}

interface DashboardItem {
    id: string;
    type: ItemType;
    settings: DashboardItemSettings;
}

interface ChartDataPoint {
    name: string;
    value: number;
}

interface MockData {
    LINE_CHART: ChartDataPoint[];
    BAR_CHART: ChartDataPoint[];
    PIE_CHART: ChartDataPoint[];
}
interface ChartDataProps {
    data: ChartDataPoint[];
}
