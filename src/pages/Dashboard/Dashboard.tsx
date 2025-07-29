import React, { useState, useCallback, useEffect } from "react";
import type { Layout } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Edit3, Grid3x3, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "../../components/Button";

import { cn } from "../../utils";
import { AddWidgetDialog } from "./AddWidgetDialog";
import { DashboardToolbar } from "./DashboardToolbar";
import DashboardItem from "./DashboardItem";

const ResponsiveGridLayout = WidthProvider(Responsive);

/* eslint-disable */

const CleanDashboard: React.FC = () => {
    // Dashboard state
    const [items, setItems] = useState<DashboardItem[]>([]);
    const [layout, setLayout] = useState<Layout[]>([]);

    // Edit state
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false);

    // New state for tracking edited widget
    const [editingWidget, setEditingWidget] = useState<DashboardItem | null>(null);

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
        // setSelectedItemId(null);
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
        setEditingWidget(null);
        setIsAddingItem(true);
    }, [isEditing]);

    // Handle save changes
    const handleSave = useCallback(() => {
        if (!hasUnsavedChanges) {
            return;
        }

        setSavedState({ items: [...items], layout: [...layout] });
        setIsEditing(false);
        // setSelectedItemId(null);

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
        // setSelectedItemId(null);
        setHistory([]);
        setHistoryIndex(-1);
    }, [hasUnsavedChanges, savedState]);

    // Handle edit widget
    const handleEditWidget = useCallback(
        (itemId: string) => {
            const widget = items.find((item) => item.id === itemId);
            if (widget) {
                setEditingWidget(widget);
                setIsAddingItem(true); // Reuse the same dialog
            }
        },
        [items],
    );

    // Handle update widget (after editing)
    const updateWidget = useCallback(
        (widgetConfig: any) => {
            if (!editingWidget) return;

            const updatedItem: DashboardItem = {
                ...editingWidget,
                type: widgetConfig.type,
                settings: {
                    title: widgetConfig.title,
                    value: widgetConfig.config?.value,
                    color: widgetConfig.config?.color,
                    label: widgetConfig.config?.label,
                    ...widgetConfig.config,
                },
            };

            setItems((prev) =>
                prev.map((item) => (item.id === editingWidget.id ? updatedItem : item)),
            );

            setEditingWidget(null);
            setIsAddingItem(false);
            setTimeout(saveToHistory, 0);
        },
        [editingWidget, saveToHistory],
    );

    // Handle adding widget
    const addItem = useCallback(
        (widgetConfig: any) => {
            if (editingWidget) {
                // This is an edit operation
                updateWidget(widgetConfig);
                return;
            }
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
        [layout, saveToHistory, editingWidget, updateWidget], // Added editingWidget and updateWidget to dependencies
    );

    // Handle deleting item
    const deleteItem = useCallback(
        (itemId: string) => {
            setLayout((prev) => prev.filter((l) => l.i !== itemId));
            setItems((prev) => prev.filter((item) => item.id !== itemId));
            // setSelectedItemId(null);
            setTimeout(saveToHistory, 0);
        },
        [saveToHistory],
    );

    // Handle close dialog
    // const handleCloseDialog = useCallback(() => {
    //     setIsAddingItem(false);
    //     setEditingWidget(null);
    // }, []);

    // Handle layout change
    const onLayoutChange = useCallback((newLayout: Layout[]) => {
        setLayout(newLayout);
    }, []);

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Clean Edit Toolbar */}
            <DashboardToolbar
                isEditing={isEditing}
                hasUnsavedChanges={hasUnsavedChanges}
                onStartEdit={handleStartEdit}
                onAddWidget={handleAddWidget}
                onSave={handleSave}
                onCancel={handleCancel}
                onShare={() => console.log("Share dashboard")}
                onExport={() => console.log("Export dashboard")}
                onSettings={() => console.log("Dashboard settings")}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className=" p-6 widget-container">
                    {items.length > 0 ? (
                        <ResponsiveGridLayout
                            className="layout"
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
                                <div key={item.id}>
                                    <DashboardItem
                                        type={item.type}
                                        settings={item.settings}
                                        isEditing={isEditing}
                                        onDelete={() => deleteItem(item.id)}
                                        onEdit={() => handleEditWidget(item.id)}
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
                editingWidget={editingWidget}
            />
        </div>
    );
};

export default CleanDashboard;
