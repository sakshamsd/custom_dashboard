import React, { useState } from "react";
import type { Layout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Plus } from "lucide-react";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import NumberCard from "../../DashboardItems/NumberCard/NumberCard";
import Indicaor from "../../DashboardItems/Indicator/Indicaor";
import Charts from "../../DashboardItems/Charts/Charts";
import DashboardItemSettings from "./DashboardItemSettings";
import AddDashboardItemDialog from "./AddDashboardItemDialog";
import { DEFAULT_SIZES, ITEM_TYPES } from "../../utils/constants";

interface DashboardItemProps {
    type: ItemType;
    settings: DashboardItemSettings;
    // onSettingsChange: (newSettings: DashboardItemSettings) => void;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ type, settings }) => {
    const renderContent = () => {
        switch (type) {
            case ITEM_TYPES.NUMBER_CARD:
                return (
                    <NumberCard
                        value={settings.value || ""}
                        detail={settings.title || ""}
                        color="bg-green-400"
                        icon={"Airplay"}
                    />
                );
            case ITEM_TYPES.INDICATOR:
                return <Indicaor title={settings.title || "Indicator"} />;
            case ITEM_TYPES.BUTTON:
                return (
                    <Card className="h-full">
                        <CardContent className="h-full flex items-center justify-center">
                            <Button>{settings.label || "Button"}</Button>
                        </CardContent>
                    </Card>
                );
            case ITEM_TYPES.PIE_CHART:
                return (
                    <Charts
                        title={settings.title || ""}
                        type={type as ChartType}
                    />
                );
            case ITEM_TYPES.LINE_CHART:
                return (
                    <Charts
                        title={settings.title || ""}
                        type={type as ChartType}
                    />
                );
            case ITEM_TYPES.BAR_CHART:
                return (
                    <Charts
                        title={settings.title || ""}
                        type={type as ChartType}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative h-full">
            {renderContent()}
            <DashboardItemSettings />
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [layout, setLayout] = useState<Layout[]>([]);
    const [items, setItems] = useState<DashboardItem[]>([]);
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
    const [isEditable, setIsEditable] = useState<boolean>(false);

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

    // const updateItemSettings = (itemId: string, newSettings: DashboardItemSettings) => {
    //     setItems(
    //         items.map((item) => (item.id === itemId ? { ...item, settings: newSettings } : item)),
    //     );
    // };

    const onLayoutChange = (newLayout: Layout[]) => {
        setLayout(newLayout);
    };

    const saveDashboard = async () => {
        setIsEditable(false);
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Custom Dashboard</h1>
                <div className="space-x-2">
                    {isEditable ? (
                        <>
                            <Button onClick={() => setIsAddingItem(true)}>
                                <Plus className="mr-2 h-4 w-4" /> Add Item
                            </Button>
                            <Button onClick={saveDashboard}>Save Dashboard</Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditable(true)}>Edit</Button>
                    )}
                </div>
            </div>

            <AddDashboardItemDialog
                isAddingItem={isAddingItem}
                setIsAddingItem={() => setIsAddingItem(!setIsAddingItem)}
                addItem={addItem}
            />

            <GridLayout
                className="layout"
                isResizable={isEditable}
                isDraggable={isEditable}
                isDroppable={isEditable}
                layout={layout}
                onLayoutChange={onLayoutChange}
                cols={12}
                rowHeight={50}
                width={1200}>
                {items.map((item) => (
                    <div key={item.id}>
                        <DashboardItem
                            type={item.type}
                            settings={item.settings}
                            // onSettingsChange={(newSettings) =>
                            //     updateItemSettings(item.id, newSettings)
                            // }
                        />
                    </div>
                ))}
            </GridLayout>
        </div>
    );
};

export default Dashboard;
