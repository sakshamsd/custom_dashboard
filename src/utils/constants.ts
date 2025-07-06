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
