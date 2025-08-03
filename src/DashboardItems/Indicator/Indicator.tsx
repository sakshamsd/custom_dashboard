import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Card";
interface IndicatorProps {
    title: string;
    value?: string | number;
}
function Indicator({ title }: IndicatorProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>{title || "Indicator"}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={"h-4 w-4 rounded-full  bg-green-500"}></div>
            </CardContent>
        </Card>
    );
}

export default Indicator;
