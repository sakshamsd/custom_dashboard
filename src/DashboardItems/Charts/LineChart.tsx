import React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart as LineChartWrapper,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function LineChart({ data }: ChartDataProps) {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%">
            <LineChartWrapper data={data}>
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
            </LineChartWrapper>
        </ResponsiveContainer>
    );
}

export default LineChart;
