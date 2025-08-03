type ChartType = "LINE_CHART" | "BAR_CHART" | "PIE_CHART";

type ItemType = "numberCard" | "indicator" | "button" | ChartType;

interface Dashboard {
    username: string;
    dashboardId: string;
    dashboardItem: DashboardItem[];
}

interface ItemTypeConfig {
    w: number;
    h: number;
}

interface DashboardItem {
    id: string;
    dataId: string | null; // Optional field to link to data source
    title: string;
    layout: {
        i: string; // Unique identifier for the item
        x: number; // Horizontal position
        y: number; // Vertical position
        w: number; // Width in grid units
        h: number; // Height in grid units
    };
    // Optional fields for additional settings

    type: ItemType;
}

interface ChartDataPoint {
    name: string;
    value: number;
}

interface ChartDataProps {
    data: ChartDataPoint[];
}

interface WidgetConfig {
    type: ItemType;
    title: string;
    dataType: "object" | "array" | "static";
    data: any;
    color?: string;
    format?: string;
    label?: string;
    [key: string]: any;
}

interface AddWidgetDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddWidget: (widgetConfig: any) => void;
    editingWidget?: (DashboardItem & { data?: string }) | null; // Add editing support
}

interface DashboardItemProps {
    type: ItemType;
    settings: DashboardItem;
    isSelected?: boolean;
    isEditing?: boolean;
    onSelect?: () => void;
    onDelete: () => void;
    onEdit: () => void;
}
