import { BarChart3, LineChart, PieChart, TrendingUp, Activity, MousePointer } from "lucide-react";
export const CHART_TYPE = {
    BAR_CHART: "BAR_CHART",
    LINE_CHART: "LINE_CHART",
    PIE_CHART: "PIE_CHART",
};

// Constants
export const ITEM_TYPES: Record<string, ItemType> = {
    NUMBER_CARD: "numberCard",
    INDICATOR: "indicator",
    BUTTON: "button",
    // CHART: "chart",
    LINE_CHART: "LINE_CHART",
    BAR_CHART: "BAR_CHART",
    PIE_CHART: "PIE_CHART",
};

export const DEFAULT_SIZES: Record<ItemType, ItemTypeConfig> = {
    numberCard: { w: 3, h: 3 },
    indicator: { w: 2, h: 2 },
    button: { w: 2, h: 2 },
    // chart: { w: 6, h: 4 },
    LINE_CHART: { w: 6, h: 4 },
    BAR_CHART: { w: 6, h: 4 },
    PIE_CHART: { w: 4, h: 4 },
};

export const WIDGET_TYPES = [
    {
        id: "line-chart",
        name: "Line Chart",
        description: "Show trends over time",
        icon: LineChart,
        type: ITEM_TYPES.LINE_CHART,
        category: "Charts",
        requiredDataType: "array",
        sampleData: `[
  {"name": "Jan", "value": 400},
  {"name": "Feb", "value": 300},
  {"name": "Mar", "value": 600}
]`,
    },
    {
        id: "bar-chart",
        name: "Bar Chart",
        description: "Compare different categories",
        icon: BarChart3,
        type: ITEM_TYPES.BAR_CHART,
        category: "Charts",
        requiredDataType: "array",
        sampleData: `[
  {"name": "Product A", "value": 400},
  {"name": "Product B", "value": 300},
  {"name": "Product C", "value": 200}
]`,
    },
    {
        id: "pie-chart",
        name: "Pie Chart",
        description: "Show proportions",
        icon: PieChart,
        type: ITEM_TYPES.PIE_CHART,
        category: "Charts",
        requiredDataType: "array",
        sampleData: `[
  {"name": "Desktop", "value": 60},
  {"name": "Mobile", "value": 30},
  {"name": "Tablet", "value": 10}
]`,
    },
    {
        id: "number-card",
        name: "Number Card",
        description: "Display key metrics",
        icon: TrendingUp,
        type: ITEM_TYPES.NUMBER_CARD,
        category: "Metrics",
        requiredDataType: "object",
        sampleData: "{\"value\": 124500}",
    },
    {
        id: "indicator",
        name: "Status Indicator",
        description: "Show system status",
        icon: Activity,
        type: ITEM_TYPES.INDICATOR,
        category: "Metrics",
        requiredDataType: "object",
        sampleData: "{\"status\": \"online\"}",
    },
    {
        id: "button",
        name: "Button",
        description: "Action trigger",
        icon: MousePointer,
        type: ITEM_TYPES.BUTTON,
        category: "Controls",
        requiredDataType: "object",
        sampleData: "{\"label\": \"Click me\"}",
    },
];

export const DATA_SOURCES = [
    { value: "static", label: "Static Data" },
    { value: "api", label: "API Endpoint" },
    { value: "database", label: "Database Query" },
    { value: "realtime", label: "Real-time Stream" },
];
