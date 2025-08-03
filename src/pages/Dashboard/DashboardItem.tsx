import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { Button } from "../../components/Button";
import NumberCard from "../../DashboardItems/NumberCard/NumberCard";
import Indicator from "../../DashboardItems/Indicator/Indicator";
import Charts from "../../DashboardItems/Charts/Charts";
import { ITEM_TYPES } from "../../utils/constants";
import { Edit3, Grid3x3, X } from "lucide-react";
import { cn } from "../../utils";


const DashboardItem: React.FC<DashboardItemProps> = ({
    type,
    settings,
    isEditing = false,
    onDelete,
    onEdit,
}) => {
    const renderContent = () => {
        switch (type) {
            case ITEM_TYPES.NUMBER_CARD:
                return (
                    <NumberCard
                        value={settings.title || ""}
                        detail={settings.title || ""}
                        color="green"
                        icon={"TrendingUp"}
                    />
                );
            case ITEM_TYPES.INDICATOR:
                return <Indicator title={settings.title || "Indicator"} />;
            case ITEM_TYPES.BUTTON:
                return <Button>{settings.title || "Button"}</Button>;
            case ITEM_TYPES.PIE_CHART:
            case ITEM_TYPES.LINE_CHART:
            case ITEM_TYPES.BAR_CHART:
                return (
                    <Charts
                        type={type as ChartType}
                        dataId={settings.dataId}
                    />
                );
            default:
                return (
                    <div className="text-center text-gray-400">
                        <Grid3x3 className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Unknown Widget</p>
                    </div>
                );
        }
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (onEdit) {
            onEdit();
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) {
            onDelete();
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="relative flex items-center justify-between p-4 ">
                <CardTitle className={cn("w-full", isEditing && "w-[calc(100%-4rem)]")}>
                    {settings.title || "Chart"}
                </CardTitle>
                {isEditing && (
                    <div className="absolute top-2 right-2">
                        <div className="flex space-x-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 bg-white/95  shadow-md border border-gray-200 pointer-events-auto"
                                onClick={handleEditClick}
                                type="button"
                                onMouseDown={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}>
                                <Edit3 className="w-3 h-3 text-gray-700" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 bg-white/95 hover:bg-white shadow-md border border-gray-200 text-red-600 hover:text-red-700 pointer-events-auto"
                                onClick={handleDeleteClick}
                                type="button"
                                onMouseDown={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}>
                                <X className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] flex items-center justify-center">
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default DashboardItem;
