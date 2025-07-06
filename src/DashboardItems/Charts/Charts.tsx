import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
import { CHART_TYPE } from "../../utils/constants";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

interface ChartsProps {
    title: string;
    type: ChartType;
}
const mockData: MockData = {
    LINE_CHART: Array.from({ length: 7 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 100),
    })),
    BAR_CHART: Array.from({ length: 5 }, (_, i) => ({
        name: `Category ${i + 1}`,
        value: Math.floor(Math.random() * 100),
    })),
    PIE_CHART: Array.from({ length: 4 }, (_, i) => ({
        name: `Segment ${i + 1}`,
        value: Math.floor(Math.random() * 100),
    })),
};

function Charts({ title, type }: ChartsProps) {
    const returnChart = () => {
        switch (type) {
            case CHART_TYPE.BAR_CHART:
                return <BarChart data={mockData.BAR_CHART} />;
            case CHART_TYPE.LINE_CHART:
                return <LineChart data={mockData.LINE_CHART} />;
            case CHART_TYPE.PIE_CHART:
                return <PieChart data={mockData.PIE_CHART} />;
            default:
                return <div>No Chart</div>;
        }
    };
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>{title || "Chart"}</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)]">{returnChart()}</CardContent>
        </Card>
    );
}

export default Charts;
