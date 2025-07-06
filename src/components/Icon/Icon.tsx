import { IconNode, Icon as LucideIcon } from "lucide-react";
interface LucideIconProps {
    icon: IconNode;
}

const Icon = ({ icon }: LucideIconProps) => <LucideIcon iconNode={icon} />;

export default Icon;
