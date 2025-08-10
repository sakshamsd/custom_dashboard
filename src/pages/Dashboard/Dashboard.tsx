import React, { useState, useCallback, useEffect } from "react";
import type { Layout } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { AddWidgetDialog } from "./AddWidgetDialog";
import { DashboardToolbar } from "./DashboardToolbar";
import DashboardItem from "./DashboardItem";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { addDashboardItem, updateDashboardItem } from "../../redux/reducer/dashboardSlice";
import EmptyDashboard from "./EmptyDashboard";

const ResponsiveGridLayout = WidthProvider(Responsive);

/* eslint-disable no-console */

const CleanDashboard: React.FC = () => {
    // Dashboard state
    const [items, setItems] = useState<DashboardItem[]>([]);
    const [layout, setLayout] = useState<Layout[]>([]);

    const data = useSelector((state: RootState) => state.dashboard);

    const dispatch = useDispatch();
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

    useEffect(() => {
        // Initialize items and layout from data
        let arr: Layout[] = [];
        if (data) {
            setItems(data.dashboardItem);
            data.dashboardItem.forEach((item: DashboardItem) => {
                arr.push(item.layout);
            });

            setLayout(arr);
            // setSavedState({ items: data.items, layout: data.layout });
        }
    }, [data]);

    // Handle start edit
    const handleStartEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

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
        setSavedState({ items: [...items], layout: [...layout] });
        setIsEditing(false);
        // setSelectedItemId(null);

        console.log("Dashboard saved:", { items, layout });
        console.log("✅ Dashboard saved successfully!");
    }, [items, layout]);

    // Handle cancel edit
    const handleCancel = useCallback(() => {
        setItems(savedState.items);
        setLayout(savedState.layout);

        setIsEditing(false);
        // setSelectedItemId(null);
    }, [savedState.items, savedState.layout]);

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

    // Handle adding widget
    const addItem = useCallback(
        (widgetConfig: DashboardItem) => {
            if (editingWidget) {
                dispatch(updateDashboardItem(widgetConfig));

                return;
            }

            dispatch(addDashboardItem(widgetConfig));
            setIsAddingItem(false);
        },
        [editingWidget, dispatch], // Added editingWidget and updateWidget to dependencies
    );

    // Handle deleting item
    const deleteItem = useCallback((itemId: string) => {
        setLayout((prev) => prev.filter((l) => l.i !== itemId));
        setItems((prev) => prev.filter((item) => item.id !== itemId));
    }, []);

    // Handle layout change
    const onLayoutChange = useCallback((newLayout: Layout[]) => {
        setLayout(newLayout);
    }, []);

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Clean Edit Toolbar */}
            <DashboardToolbar
                isEditing={isEditing}
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
                                        settings={item}
                                        isEditing={isEditing}
                                        onDelete={() => deleteItem(item.id)}
                                        onEdit={() => handleEditWidget(item.id)}
                                    />
                                </div>
                            ))}
                        </ResponsiveGridLayout>
                    ) : (
                        /* Empty State */
                        <EmptyDashboard handleStartEdit={handleStartEdit} />
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
