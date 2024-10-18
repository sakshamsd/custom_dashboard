import React from "react";
import {
    Bar,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    BarChart as BarChartWrapper,
    ResponsiveContainer,
} from "recharts";

function BarChart({ data }: ChartDataProps) {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%">
            <BarChartWrapper data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="value"
                    fill="#8884d8"
                />
            </BarChartWrapper>
        </ResponsiveContainer>
    );
}

export default BarChart;
