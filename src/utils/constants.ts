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
    },
    {
        id: "indicator",
        name: "Status Indicator",
        description: "Show system status",
        icon: Activity,
        type: ITEM_TYPES.INDICATOR,
    },
    {
        id: "button",
        name: "Button",
        description: "Action trigger",
        icon: MousePointer,
        type: ITEM_TYPES.BUTTON,
    },
];


export const DATA_SOURCES = [
    { value: "b43e07ac-1fab-4e52-9c6f-de3657b6c556", label: "Revenue in year 2025" },
    { value: "5a8c4bfe-8414-47e0-ba30-891d6b6677a4", label: "Sales in year 2025" },
    { value: "8b9a97ed-e377-4fd6-a302-e167e6b98284", label: "Total Sales in year 2025" },
    { value: "990b4523-d069-4147-8e5f-e9d57ac6ee14", label: "New Customers in year 2025" },
];
