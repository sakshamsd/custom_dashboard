import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "../../components/Dialog";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/Select";
import { Card, CardContent } from "../../components/Card";
import { Type, AlertCircle, CheckCircle } from "lucide-react";
import { DATA_SOURCES, ITEM_TYPES, WIDGET_TYPES } from "../../utils/constants";
import Charts from "../../DashboardItems/Charts/Charts";
import NumberCard from "../../DashboardItems/NumberCard/NumberCard";
import Indicaor from "../../DashboardItems/Indicator/Indicator";
import { cn } from "../../utils";

export const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({
    isOpen,
    onClose,
    onAddWidget,
    editingWidget = null,
}) => {
    const [selectedType, setSelectedType] = useState<string>("");
    const [config, setConfig] = useState<DashboardItem>({
        dataId: "",
        id: "",
        title: "",
        type: ITEM_TYPES.LINE_CHART,
        layout: { x: 0, y: 0, w: 6, h: 4, i: "" },
    });

    const selectedWidget = WIDGET_TYPES.find((w) => w.id === selectedType);
    const isEditMode = !!editingWidget;

    // Reset form when dialog opens/closes or when editing widget changes
    useEffect(() => {
        if (isOpen) {
            if (editingWidget) {
                // Edit mode - populate with existing widget data
                const widgetType = WIDGET_TYPES.find((w) => w.type === editingWidget.type);
                if (widgetType) {
                    setSelectedType(widgetType.id);
                    setConfig({
                        ...editingWidget,
                    });
                }
            }
        }
    }, [isOpen, editingWidget]);

    const handleConfigChange = (key: string, value: string) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddWidget = () => {
        if (!selectedWidget) {
            return;
        }

        const widget = {
            type: selectedWidget.type,
            title: config.title || selectedWidget.name,
            id: config.id,
            dataId: config.dataId,

            layout: {
                ...config.layout,
            },
        };

        onAddWidget(widget);
        onClose();
    };

    const renderPreview = () => {
        if (!selectedWidget) {
            return (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center text-gray-400">
                        <Type className="w-12 h-12 mx-auto mb-3" />
                        <p className="text-sm">Select a widget type to see preview</p>
                    </div>
                </div>
            );
        }

        try {
            switch (selectedWidget.type) {
                case ITEM_TYPES.NUMBER_CARD:
                    return (
                        <NumberCard
                            value={"0"}
                            detail={config.title || "Metric"}
                            color="green"
                            icon="TrendingUp"
                        />
                    );
                case ITEM_TYPES.INDICATOR:
                    return <Indicaor title={config.title || "Status"} />;
                case ITEM_TYPES.BUTTON:
                    return (
                        <div className="h-full flex items-center justify-center">
                            <Button>{config.title || "Button"}</Button>
                        </div>
                    );
                case ITEM_TYPES.LINE_CHART:
                case ITEM_TYPES.BAR_CHART:
                case ITEM_TYPES.PIE_CHART:
                    return (
                        <Charts
                            type={selectedWidget.type as ChartType}
                            dataId={config.dataId}
                        />
                    );
                default:
                    return (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            <p>Preview not available</p>
                        </div>
                    );
            }
        } catch {
            return (
                <div className="h-full flex items-center justify-center bg-red-50 rounded-lg">
                    <div className="text-center text-red-600">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Preview Error</p>
                    </div>
                </div>
            );
        }
    };

    const renderWidgetSpecificFields = () => {
        if (!selectedWidget) {
            return null;
        }

        switch (selectedWidget.type) {
            case ITEM_TYPES.NUMBER_CARD:
                return (
                    <div className="space-y-3">
                        {/* <div>
                            <Label className="text-sm font-medium">Format</Label>
                            <Select
                                value={config.format || "number"}
                                onValueChange={(value) => handleConfigChange("format", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="currency">Currency</SelectItem>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Color Theme</Label>
                            <Select
                                value={config.color || "blue"}
                                onValueChange={(value) => handleConfigChange("color", value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="blue">Blue</SelectItem>
                                    <SelectItem value="green">Green</SelectItem>
                                    <SelectItem value="red">Red</SelectItem>
                                    <SelectItem value="purple">Purple</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}
                    </div>
                );

            case ITEM_TYPES.BUTTON:
                return (
                    <div>
                        <Label className="text-sm font-medium">Button Action</Label>
                        {/* <Select
                            value={config.action || "navigate"}
                            onValueChange={(value) => handleConfigChange("action", value)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="navigate">Navigate</SelectItem>
                                <SelectItem value="submit">Submit Form</SelectItem>
                                <SelectItem value="download">Download</SelectItem>
                                <SelectItem value="custom">Custom Action</SelectItem>
                            </SelectContent>
                        </Select> */}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}>
            <DialogContent
                className="max-w-6xl max-h-[85vh] overflow-hidden"
                aria-description="Add or edit a widget"
                aria-describedby="widget-dialog-description">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? `Edit ${editingWidget?.title || "Widget"}` : "Add Widget"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Modify the widget settings and data."
                            : "Select a widget type and configure its settings."}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-12 gap-6 h-[600px]">
                    {/* Left Panel - Widget Types */}
                    <div className="col-span-3 space-y-4 overflow-y-auto">
                        <div>
                            <h3 className="font-medium text-sm text-gray-900 mb-3">Widget Types</h3>
                            <div className="space-y-2">
                                {WIDGET_TYPES.map((widget) => {
                                    const Icon = widget.icon;
                                    return (
                                        <Card
                                            key={widget.id}
                                            className={cn(
                                                "cursor-pointer transition-all hover:shadow-sm",
                                                selectedType === widget.id
                                                    ? "ring-2 ring-blue-500 bg-blue-50"
                                                    : "hover:border-gray-300",
                                            )}
                                            onClick={() => setSelectedType(widget.id)}>
                                            <CardContent className="p-3">
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className={cn(
                                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                                            selectedType === widget.id
                                                                ? "bg-blue-600"
                                                                : "bg-gray-100",
                                                        )}>
                                                        <Icon
                                                            className={cn(
                                                                "w-4 h-4",
                                                                selectedType === widget.id
                                                                    ? "text-white"
                                                                    : "text-gray-600",
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {widget.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {widget.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Middle Panel - Configuration */}
                    <div className="col-span-4 space-y-4 overflow-y-auto">
                        <div>
                            <h3 className="font-medium text-sm text-gray-900 mb-3">
                                Configuration
                            </h3>

                            {selectedWidget ? (
                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <Label className="text-sm font-medium">Title</Label>
                                        <Input
                                            value={config.title}
                                            onChange={(e) =>
                                                handleConfigChange("title", e.target.value)
                                            }
                                            placeholder="Enter widget title"
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Data Source */}
                                    <div>
                                        <Label className="text-sm font-medium">Data Source</Label>
                                        <Select
                                            value={config.dataId || ""}
                                            onValueChange={(value) =>
                                                handleConfigChange("dataId", value)
                                            }>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DATA_SOURCES.map((source) => (
                                                    <SelectItem
                                                        key={source.value}
                                                        value={source.value}>
                                                        {source.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-gray-500 mt-1">
                                            API and Database sources coming in Phase 2
                                        </p>
                                    </div>

                                    {/* Widget-specific fields */}
                                    {renderWidgetSpecificFields()}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Type className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm">Select a widget type to configure</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="col-span-5">
                        <div className="h-full flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-sm text-gray-900">Live Preview</h3>
                                {selectedWidget && (
                                    <div className="text-xs text-gray-500">
                                        {selectedWidget.name} • {selectedWidget.requiredDataType}{" "}
                                        data
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white">
                                {renderPreview()}
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <div className="flex justify-between w-full">
                        <div className="text-sm text-gray-500">
                            {selectedWidget && (
                                <span className="flex items-center space-x-1">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Ready to add widget</span>
                                </span>
                            )}
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddWidget}
                                disabled={!selectedWidget}>
                                {isEditMode ? "Update Widget" : "Add Widget"}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
