import React, { useState, useEffect } from "react";
import type { Layout, Layouts } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Settings, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/Dialog";

// Type definitions
type ItemType = "numberCard" | "indicator" | "button" | "lineChart" | "barChart" | "pieChart";

interface ItemTypeConfig {
    w: number;
    h: number;
}

interface DashboardItemSettings {
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
    lineChart: ChartDataPoint[];
    barChart: ChartDataPoint[];
    pieChart: ChartDataPoint[];
}

// Constants
const ITEM_TYPES: Record<string, ItemType> = {
    NUMBER_CARD: "numberCard",
    INDICATOR: "indicator",
    BUTTON: "button",
    LINE_CHART: "lineChart",
    BAR_CHART: "barChart",
    PIE_CHART: "pieChart",
};

const DEFAULT_SIZES: Record<ItemType, ItemTypeConfig> = {
    numberCard: { w: 2, h: 2 },
    indicator: { w: 2, h: 2 },
    button: { w: 2, h: 2 },
    lineChart: { w: 6, h: 4 },
    barChart: { w: 6, h: 4 },
    pieChart: { w: 4, h: 4 },
};

// Mock data
const mockData: MockData = {
    lineChart: Array.from({ length: 7 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 100),
    })),
    barChart: Array.from({ length: 5 }, (_, i) => ({
        name: `Category ${i + 1}`,
        value: Math.floor(Math.random() * 100),
    })),
    pieChart: Array.from({ length: 4 }, (_, i) => ({
        name: `Segment ${i + 1}`,
        value: Math.floor(Math.random() * 100),
    })),
};

interface DashboardItemProps {
    type: ItemType;
    settings: DashboardItemSettings;
    onSettingsChange: (newSettings: DashboardItemSettings) => void;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ type, settings, onSettingsChange }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const renderContent = () => {
        switch (type) {
            case ITEM_TYPES.NUMBER_CARD:
                return (
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{settings.title || "Number Card"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{settings.value || 0}</div>
                        </CardContent>
                    </Card>
                );
            case ITEM_TYPES.INDICATOR:
                return (
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{settings.title || "Indicator"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`h-4 w-4 rounded-full ${settings.color || "bg-green-500"}`}></div>
                        </CardContent>
                    </Card>
                );
            case ITEM_TYPES.BUTTON:
                return (
                    <Card className="h-full">
                        <CardContent className="h-full flex items-center justify-center">
                            <Button>{settings.label || "Button"}</Button>
                        </CardContent>
                    </Card>
                );
            case ITEM_TYPES.LINE_CHART:
                return (
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{settings.title || "Line Chart"}</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-4rem)]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%">
                                <LineChart data={mockData.lineChart}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                );
            case ITEM_TYPES.BAR_CHART:
                return (
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{settings.title || "Bar Chart"}</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-4rem)]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%">
                                <BarChart data={mockData.barChart}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="value"
                                        fill="#8884d8"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                );
            case ITEM_TYPES.PIE_CHART:
                return (
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{settings.title || "Pie Chart"}</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-4rem)]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%">
                                <PieChart>
                                    <Pie
                                        data={mockData.pieChart}
                                        dataKey="value"
                                        nameKey="name"
                                        fill="#8884d8"
                                    />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative h-full">
            {renderContent()}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4" />
            </Button>

            <Dialog
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Item Settings</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {Object.entries(settings).map(([key, value]) => (
                            <div
                                key={key}
                                className="grid grid-cols-4 items-center gap-4">
                                <label
                                    htmlFor={key}
                                    className="text-right">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </label>
                                <input
                                    id={key}
                                    className="col-span-3 p-2 border rounded"
                                    value={value}
                                    onChange={(e) =>
                                        onSettingsChange({ ...settings, [key]: e.target.value })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsSettingsOpen(false)}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [layout, setLayout] = useState<Layout[]>([]);
    const [items, setItems] = useState<DashboardItem[]>([]);
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false);

    const addItem = (type: ItemType) => {
        const newItemId = `item-${items.length}`;
        const defaultSize = DEFAULT_SIZES[type];

        const newLayoutItem: Layout = {
            i: newItemId,
            x: (layout.length * 1) % 12,
            y: Infinity,
            w: defaultSize.w,
            h: defaultSize.h,
        };

        const newItem: DashboardItem = {
            id: newItemId,
            type,
            settings: getDefaultSettings(type),
        };

        setLayout([...layout, newLayoutItem]);
        setItems([...items, newItem]);
        setIsAddingItem(false);
    };

    const getDefaultSettings = (type: ItemType): DashboardItemSettings => {
        switch (type) {
            case ITEM_TYPES.NUMBER_CARD:
                return { title: "Number", value: "42" };
            case ITEM_TYPES.INDICATOR:
                return { title: "Status", color: "bg-green-500" };
            case ITEM_TYPES.BUTTON:
                return { label: "Click me" };
            case ITEM_TYPES.LINE_CHART:
            case ITEM_TYPES.BAR_CHART:
            case ITEM_TYPES.PIE_CHART:
                return { title: "Chart" };
            default:
                return { title: "" };
        }
    };

    const updateItemSettings = (itemId: string, newSettings: DashboardItemSettings) => {
        setItems(
            items.map((item) => (item.id === itemId ? { ...item, settings: newSettings } : item)),
        );
    };

    const onLayoutChange = (newLayout: Layout[]) => {
        setLayout(newLayout);
    };

    const saveDashboard = async () => {
        try {
            await fetch("/api/dashboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: "user123",
                    layout,
                    items,
                }),
            });
        } catch (error) {
            console.error("Error saving dashboard:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Custom Dashboard</h1>
                <div className="space-x-2">
                    <Button onClick={() => setIsAddingItem(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                    <Button onClick={saveDashboard}>Save Dashboard</Button>
                </div>
            </div>

            <Dialog
                open={isAddingItem}
                onOpenChange={setIsAddingItem}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Dashboard Item</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {Object.values(ITEM_TYPES).map((type) => (
                            <Button
                                key={type}
                                onClick={() => addItem(type as ItemType)}>
                                Add {type}
                            </Button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <GridLayout
                className="layout bg-red-300"
                layout={layout}
                onLayoutChange={onLayoutChange}
                cols={12}
                rowHeight={50}
                width={1200}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-green-300">
                        <DashboardItem
                            type={item.type}
                            settings={item.settings}
                            onSettingsChange={(newSettings) =>
                                updateItemSettings(item.id, newSettings)
                            }
                        />
                    </div>
                ))}
            </GridLayout>
        </div>
    );
};

export default Dashboard;
