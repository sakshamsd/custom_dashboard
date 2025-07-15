// src/pages/Dashboard/SingleStepAddWidgetDialog.tsx
import React, { useState, useMemo, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
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
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import {
    BarChart3,
    LineChart,
    PieChart,
    TrendingUp,
    Activity,
    Type,
    Table,
    MousePointer,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { ITEM_TYPES } from "../../utils/constants";
import Charts from "../../DashboardItems/Charts/Charts";
import NumberCard from "../../DashboardItems/NumberCard/NumberCard";
import Indicaor from "../../DashboardItems/Indicator/Indicaor";
import { cn } from "../../utils";

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

interface DataValidation {
    isValid: boolean;
    error?: string;
    parsedData?: any;
}

const WIDGET_TYPES = [
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

const DATA_SOURCES = [
    { value: "static", label: "Static Data" },
    { value: "api", label: "API Endpoint" },
    { value: "database", label: "Database Query" },
    { value: "realtime", label: "Real-time Stream" },
];

interface AddWidgetDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddWidget: (widgetConfig: any) => void;
}

export const AddWidgetDialog: React.FC<AddWidgetDialogProps> = ({
    isOpen,
    onClose,
    onAddWidget,
}) => {
    const [selectedType, setSelectedType] = useState<string>("");
    const [config, setConfig] = useState<WidgetConfig>({
        type: ITEM_TYPES.LINE_CHART,
        title: "",
        dataType: "array",
        data: "",
    });
    const [dataInput, setDataInput] = useState<string>("");

    const selectedWidget = WIDGET_TYPES.find((w) => w.id === selectedType);

    // Reset form when dialog opens/closes
    useEffect(() => {
        if (isOpen) {
            setSelectedType("");
            setConfig({
                type: ITEM_TYPES.LINE_CHART,
                title: "",
                dataType: "array",
                data: "",
            });
            setDataInput("");
        }
    }, [isOpen]);

    // Update config when widget type changes
    useEffect(() => {
        if (selectedWidget) {
            setConfig((prev) => ({
                ...prev,
                type: selectedWidget.type,
                title: selectedWidget.name,
                dataType: selectedWidget.requiredDataType as "object" | "array",
            }));
            setDataInput(selectedWidget.sampleData);
        }
    }, [selectedWidget]);

    // Validate data input
    const dataValidation = useMemo((): DataValidation => {
        if (!dataInput.trim()) {
            return { isValid: false, error: "Data is required" };
        }

        try {
            const parsedData = JSON.parse(dataInput);

            if (!selectedWidget) {
                return { isValid: false, error: "Please select a widget type" };
            }

            // Validate data type matches widget requirements
            if (selectedWidget.requiredDataType === "array" && !Array.isArray(parsedData)) {
                return {
                    isValid: false,
                    error: `${selectedWidget.name} requires array data. Example: [{"name": "A", "value": 10}]`,
                };
            }

            if (
                selectedWidget.requiredDataType === "object" &&
                (Array.isArray(parsedData) || typeof parsedData !== "object")
            ) {
                return {
                    isValid: false,
                    error: `${selectedWidget.name} requires object data. Example: {"value": 100}`,
                };
            }

            // Validate array structure for charts
            if (selectedWidget.category === "Charts" && Array.isArray(parsedData)) {
                const hasValidStructure = parsedData.every(
                    (item) =>
                        typeof item === "object" &&
                        item !== null &&
                        "name" in item &&
                        "value" in item,
                );

                if (!hasValidStructure) {
                    return {
                        isValid: false,
                        error: "Chart data must be array of objects with \"name\" and \"value\" properties",
                    };
                }
            }

            // Validate specific requirements for number card
            if (selectedWidget.type === ITEM_TYPES.NUMBER_CARD && typeof parsedData === "object") {
                if (!("value" in parsedData)) {
                    return {
                        isValid: false,
                        error: "Number card requires \"value\" property. Example: {\"value\": 123}",
                    };
                }
            }

            return { isValid: true, parsedData };
        } catch (error) {
            return { isValid: false, error: "Invalid JSON format" };
        }
    }, [dataInput, selectedWidget]);

    const handleConfigChange = (key: string, value: any) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddWidget = () => {
        if (!selectedWidget || !dataValidation.isValid) {
            return;
        }

        const widget = {
            type: selectedWidget.type,
            title: config.title || selectedWidget.name,
            config: {
                ...config,
                dataSource: {
                    type: "static",
                    data: dataValidation.parsedData,
                },
            },
            data: dataValidation.parsedData,
        };

        onAddWidget(widget);
        onClose();
    };

    const renderPreview = () => {
        if (!selectedWidget || !dataValidation.isValid) {
            return (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-center text-gray-400">
                        {!selectedWidget ? (
                            <>
                                <Type className="w-12 h-12 mx-auto mb-3" />
                                <p className="text-sm">Select a widget type to see preview</p>
                            </>
                        ) : !dataValidation.isValid ? (
                            <>
                                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-400" />
                                <p className="text-sm text-red-600">
                                    Fix data errors to see preview
                                </p>
                                <p className="text-xs text-red-500 mt-1">{dataValidation.error}</p>
                            </>
                        ) : null}
                    </div>
                </div>
            );
        }

        // const previewProps = {
        //     title: config.title || selectedWidget.name,
        //     ...config,
        // };

        try {
            switch (selectedWidget.type) {
                case ITEM_TYPES.NUMBER_CARD:
                    return (
                        <NumberCard
                            value={dataValidation.parsedData?.value || "0"}
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
                            <Button>
                                {dataValidation.parsedData?.label || config.title || "Button"}
                            </Button>
                        </div>
                    );
                case ITEM_TYPES.LINE_CHART:
                case ITEM_TYPES.BAR_CHART:
                case ITEM_TYPES.PIE_CHART:
                    return (
                        <Charts
                            title={config.title || selectedWidget.name}
                            type={selectedWidget.type as ChartType}
                        />
                    );
                default:
                    return (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            <p>Preview not available</p>
                        </div>
                    );
            }
        } catch (error) {
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
                        <div>
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
                        </div>
                    </div>
                );

            case ITEM_TYPES.BUTTON:
                return (
                    <div>
                        <Label className="text-sm font-medium">Button Action</Label>
                        <Select
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
                        </Select>
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
            <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Add Widget</DialogTitle>
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
                                            value="static"
                                            disabled>
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

                                    {/* Data Input */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-sm font-medium">Data</Label>
                                            <div className="flex items-center space-x-1">
                                                {dataValidation.isValid ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                                )}
                                                <span
                                                    className={cn(
                                                        "text-xs",
                                                        dataValidation.isValid
                                                            ? "text-green-600"
                                                            : "text-red-600",
                                                    )}>
                                                    {dataValidation.isValid ? "Valid" : "Invalid"}
                                                </span>
                                            </div>
                                        </div>

                                        <textarea
                                            value={dataInput}
                                            onChange={(e) => setDataInput(e.target.value)}
                                            placeholder={`Enter JSON data (${selectedWidget.requiredDataType})`}
                                            className={cn(
                                                "w-full h-32 px-3 py-2 text-sm border rounded-md resize-none font-mono",
                                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                                                dataValidation.isValid
                                                    ? "border-gray-300"
                                                    : "border-red-300 bg-red-50",
                                            )}
                                        />

                                        {!dataValidation.isValid && dataValidation.error && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {dataValidation.error}
                                            </p>
                                        )}

                                        <div className="mt-2">
                                            <p className="text-xs text-gray-500">
                                                Expected format: {selectedWidget.requiredDataType}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-xs p-0 h-auto text-blue-600 hover:text-blue-700"
                                                onClick={() =>
                                                    setDataInput(selectedWidget.sampleData)
                                                }>
                                                Use sample data
                                            </Button>
                                        </div>
                                    </div>
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
                            {selectedWidget && dataValidation.isValid && (
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
                                disabled={!selectedWidget || !dataValidation.isValid}>
                                Add Widget
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
