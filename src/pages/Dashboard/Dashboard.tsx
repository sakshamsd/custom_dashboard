// src/pages/Dashboard/CleanDashboard.tsx
import React, { useState, useCallback, useEffect } from "react";
import type { Layout } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Edit3, Grid3x3, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import NumberCard from "../../DashboardItems/NumberCard/NumberCard";
import Indicaor from "../../DashboardItems/Indicator/Indicaor";
import Charts from "../../DashboardItems/Charts/Charts";
import { DEFAULT_SIZES, ITEM_TYPES } from "../../utils/constants";
import { cn } from "../../utils";
import { AddWidgetDialog } from "./AddWidgetDialog";
import { DashboardToolbar } from "./DashboardToolbar";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardItemProps {
    type: ItemType;
    settings: DashboardItemSettings;
    isSelected?: boolean;
    isEditing?: boolean;
    onSelect?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
}
/* eslint-disable */
const DashboardItem: React.FC<DashboardItemProps> = ({
    type,
    settings,
    isSelected = false,
    isEditing = false,
    onSelect,
    onDelete,
    onEdit,
}) => {
    const renderContent = () => {
        switch (type) {
            case ITEM_TYPES.NUMBER_CARD:
                return (
                    <NumberCard
                        value={settings.value || ""}
                        detail={settings.title || ""}
                        color="green"
                        icon={"TrendingUp"}
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
            case ITEM_TYPES.LINE_CHART:
            case ITEM_TYPES.BAR_CHART:
                return (
                    <Charts
                        title={settings.title || ""}
                        type={type as ChartType}
                    />
                );
            default:
                return (
                    <Card className="h-full">
                        <CardContent className="h-full flex items-center justify-center">
                            <div className="text-center text-gray-400">
                                <Grid3x3 className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm">Unknown Widget</p>
                            </div>
                        </CardContent>
                    </Card>
                );
        }
    };

    return (
        <div
            className={cn(
                "relative h-full group transition-all duration-200",
                isSelected && "ring-2 ring-blue-500 ring-opacity-60",
                isEditing && "cursor-pointer",
            )}
            onClick={onSelect}>
            {renderContent()}

            {/* Edit Controls */}
            {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-200">
                    {/* Selection Indicator */}
                    {isSelected && (
                        <div className="absolute -top-8 left-0 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                            {settings.title || type}
                        </div>
                    )}

                    {/* Hover Controls */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 bg-white/90 hover:bg-white shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit?.();
                                }}>
                                <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 bg-white/90 hover:bg-white shadow-sm text-red-600 hover:text-red-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}>
                                ×
                            </Button>
                        </div>
                    </div>

                    {/* Resize Handle */}
                    {isSelected && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 border-2 border-white rounded-full cursor-se-resize"></div>
                    )}
                </div>
            )}
        </div>
    );
};

const CleanDashboard: React.FC = () => {
    // Dashboard state
    const [items, setItems] = useState<DashboardItem[]>([]);
    const [layout, setLayout] = useState<Layout[]>([]);

    // Edit state
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false);

    // Save state
    const [savedState, setSavedState] = useState<{ items: DashboardItem[]; layout: Layout[] }>({
        items: [],
        layout: [],
    });
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

    // History state for undo/redo
    const [history, setHistory] = useState<Array<{ items: DashboardItem[]; layout: Layout[] }>>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Check for unsaved changes
    useEffect(() => {
        const currentState = JSON.stringify({ items, layout });
        const savedStateStr = JSON.stringify(savedState);
        setHasUnsavedChanges(currentState !== savedStateStr);
    }, [items, layout, savedState]);

    // Save to history for undo/redo
    const saveToHistory = useCallback(() => {
        if (!isEditing) {
            return;
        }

        const newState = { items: [...items], layout: [...layout] };
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newState);

        if (newHistory.length > 50) {
            newHistory.shift();
        } else {
            setHistoryIndex(newHistory.length - 1);
        }

        setHistory(newHistory);
    }, [items, layout, history, historyIndex, isEditing]);

    // Handle start edit
    const handleStartEdit = useCallback(() => {
        setIsEditing(true);
        setSelectedItemId(null);
        // Save current state as starting point
        const currentState = { items: [...items], layout: [...layout] };
        setHistory([currentState]);
        setHistoryIndex(0);
    }, [items, layout]);

    // Handle add widget - only available in edit mode
    const handleAddWidget = useCallback(() => {
        if (!isEditing) {
            return;
        } // Should not happen with UI logic
        setIsAddingItem(true);
    }, [isEditing]);

    // Handle save changes
    const handleSave = useCallback(() => {
        if (!hasUnsavedChanges) {
            return;
        }

        setSavedState({ items: [...items], layout: [...layout] });
        setIsEditing(false);
        setSelectedItemId(null);

        console.log("Dashboard saved:", { items, layout });
        console.log("✅ Dashboard saved successfully!");
    }, [items, layout, hasUnsavedChanges]);

    // Handle cancel edit
    const handleCancel = useCallback(() => {
        if (hasUnsavedChanges) {
            setItems(savedState.items);
            setLayout(savedState.layout);
        }

        setIsEditing(false);
        setSelectedItemId(null);
        setHistory([]);
        setHistoryIndex(-1);
    }, [hasUnsavedChanges, savedState]);

    // Handle adding widget
    const addItem = useCallback(
        (widgetConfig: any) => {
            const newItemId = `item-${Date.now()}`;
            // const defaultSize = DEFAULT_SIZES[widgetConfig.type] || { w: 6, h: 4 };
            const defaultSize = { w: 6, h: 4 };

            const newLayoutItem: Layout = {
                i: newItemId,
                x: (layout.length * 2) % 12,
                y: Math.floor(layout.length / 6) * 4,
                w: defaultSize.w,
                h: defaultSize.h,
                static: false,
            };

            const newItem: DashboardItem = {
                id: newItemId,
                type: widgetConfig.type,
                settings: {
                    title: widgetConfig.title,
                    value: widgetConfig.config?.value,
                    color: widgetConfig.config?.color,
                    label: widgetConfig.config?.label,
                    ...widgetConfig.config,
                },
            };

            setLayout((prev) => [...prev, newLayoutItem]);
            setItems((prev) => [...prev, newItem]);
            setIsAddingItem(false);

            setTimeout(saveToHistory, 0);
        },
        [layout, saveToHistory],
    );

    // Handle deleting item
    const deleteItem = useCallback(
        (itemId: string) => {
            setLayout((prev) => prev.filter((l) => l.i !== itemId));
            setItems((prev) => prev.filter((item) => item.id !== itemId));
            setSelectedItemId(null);
            setTimeout(saveToHistory, 0);
        },
        [saveToHistory],
    );

    // Handle layout change
    const onLayoutChange = useCallback((newLayout: Layout[]) => {
        setLayout(newLayout);
    }, []);

    // Handle undo
    const handleUndo = useCallback(() => {
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1];
            setItems(prevState.items);
            setLayout(prevState.layout);
            setHistoryIndex(historyIndex - 1);
        }
    }, [history, historyIndex]);

    // Handle redo
    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1];
            setItems(nextState.items);
            setLayout(nextState.layout);
            setHistoryIndex(historyIndex + 1);
        }
    }, [history, historyIndex]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isEditing) {
                return;
            }

            if (e.metaKey || e.ctrlKey) {
                switch (e.key) {
                    case "z":
                        if (e.shiftKey) {
                            e.preventDefault();
                            handleRedo();
                        } else {
                            e.preventDefault();
                            handleUndo();
                        }
                        break;
                    case "y":
                        e.preventDefault();
                        handleRedo();
                        break;
                    case "s":
                        e.preventDefault();
                        handleSave();
                        break;
                }
            }
            if (e.key === "Escape") {
                handleCancel();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isEditing, handleUndo, handleRedo, handleSave, handleCancel]);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Clean Edit Toolbar */}
            <DashboardToolbar
                isEditing={isEditing}
                hasUnsavedChanges={hasUnsavedChanges}
                canUndo={canUndo}
                canRedo={canRedo}
                onStartEdit={handleStartEdit}
                onAddWidget={handleAddWidget}
                onSave={handleSave}
                onCancel={handleCancel}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onShare={() => console.log("Share dashboard")}
                onExport={() => console.log("Export dashboard")}
                onSettings={() => console.log("Dashboard settings")}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full p-6">
                    {items.length > 0 ? (
                        <ResponsiveGridLayout
                            className={cn(
                                "layout transition-all duration-300",
                                isEditing && "editing-mode",
                            )}
                            isResizable={isEditing}
                            isDraggable={isEditing}
                            layouts={{ lg: layout }}
                            onLayoutChange={onLayoutChange}
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                            rowHeight={60}
                            margin={[16, 16]}
                            containerPadding={[0, 0]}
                            useCSSTransforms={true}>
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="widget-container">
                                    <DashboardItem
                                        type={item.type}
                                        settings={item.settings}
                                        isSelected={selectedItemId === item.id}
                                        isEditing={isEditing}
                                        onSelect={() => isEditing && setSelectedItemId(item.id)}
                                        onDelete={() => deleteItem(item.id)}
                                        onEdit={() => console.log("Edit item:", item.id)}
                                    />
                                </div>
                            ))}
                        </ResponsiveGridLayout>
                    ) : (
                        /* Empty State */
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center max-w-lg">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                    <BarChart3 className="w-12 h-12 text-blue-600" />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Create Your Dashboard
                                </h2>

                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                    Start building your analytics dashboard by entering edit mode.
                                    Add charts, metrics, and widgets to visualize your data.
                                </p>

                                <Button
                                    onClick={handleStartEdit}
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium">
                                    <Edit3 className="w-6 h-6 mr-3" />
                                    Start Editing
                                </Button>

                                <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <TrendingUp className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">Charts</p>
                                        <p className="text-xs text-gray-500">Line, Bar, Pie</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Grid3x3 className="w-6 h-6 text-green-600" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">Metrics</p>
                                        <p className="text-xs text-gray-500">KPIs, Numbers</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                            <Edit3 className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            Controls
                                        </p>
                                        <p className="text-xs text-gray-500">Buttons, Tables</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Widget Dialog */}
            <AddWidgetDialog
                isOpen={isAddingItem}
                onClose={() => setIsAddingItem(false)}
                onAddWidget={addItem}
            />
        </div>
    );
};

export default CleanDashboard;
