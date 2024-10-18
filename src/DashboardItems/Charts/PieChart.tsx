import { Pie, PieChart as PieChartWrapper, ResponsiveContainer, Tooltip } from "recharts";

function PieChart({ data }: ChartDataProps) {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%">
            <PieChartWrapper>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    fill="#8884d8"
                />
                <Tooltip />
            </PieChartWrapper>
        </ResponsiveContainer>
    );
}

export default PieChart;
