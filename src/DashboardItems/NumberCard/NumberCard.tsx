import React from "react";
import { Card, CardContent } from "../../components/Card";
import { Label } from "../../components/Label";
// import { Icon } from "lucide-react";
import { icons } from "lucide-react";

interface IconProps {
    name: keyof typeof icons;
    color?: string;
    size?: number;
}

const Icon = ({ name, color, size }: IconProps) => {
    const LucideIcon = icons[name];

    return (
        <LucideIcon
            color={color}
            size={size}
        />
    );
};
interface NumberCardProps {
    value: string | number;
    detail: string;
    icon: keyof typeof icons;
    color: string;
}

export default function NumberCard({ value, detail, icon }: NumberCardProps) {
    return (
        <Card className="w-[350px]">
            <CardContent className="bg-green-100 px-4 py-8">
                <div className=" flex flex-col justify-center items-center">
                    <span className=" h-20 w-20 rounded-full bg-green-300 flex justify-center items-center mb-4 opacity-85">
                        <Icon
                            name={icon}
                            size={32}
                            color="green"
                        />
                    </span>
                    <Label className=" text-4xl">{value}</Label>
                    <Label className="mt-2">{detail}</Label>
                </div>
            </CardContent>
        </Card>
    );
}
