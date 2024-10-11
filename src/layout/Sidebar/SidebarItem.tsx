import { useLocation, useNavigate } from "react-router-dom";
import { SidebarItemType } from "./Sidebar";
import { cn } from "../../utils";
import Icon from "../../components/Icon/Icon";
import { Tooltip } from "../../components/Tooltip/Tooltip";

export type SidebarItemProps = {
    isLabelShown: boolean;

    onClick?: () => void;
    className?: string;
} & SidebarItemType;

export const SidebarItem = ({
    label,
    icon,
    path,
    isLabelShown,
    onClick,
    className = "",
}: SidebarItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRoute = () => {
        onClick ? onClick() : navigate(path);
    };

    const isCurrentPath = location.pathname.split("/")?.[1] === path.split("/")?.[1];

    if (isLabelShown) {
        return (
            <button
                onClick={handleRoute}
                className={cn(
                    "w-full items-center flex font-light transition-all duration-300 hover:bg-blue-100 p-2 justify-center mb-4",
                    "md:justify-start",
                    isCurrentPath && "bg-blue-100 font-medium rounded-md",
                    className,
                )}>
                <Icon
                    icon={icon}
                    // className={cn({
                    //     "text-blue-900": isCurrentPath,
                    // })}
                />
                <span
                    className={cn(
                        "pl-4 text-sm hidden md:block",
                        isCurrentPath && "font-semibold text-blue-900",
                    )}>
                    {label}
                </span>
            </button>
        );
    }

    return (
        <div className="mb-4 cursor-pointer">
            <Tooltip
                side="bottom"
                triggerElement={
                    <button
                        onClick={handleRoute}
                        className={cn(
                            "w-full items-center font-light transition-all duration-300 hover:bg-blue-100 p-2 justify-center",
                            "flex rounded",
                            isCurrentPath && "bg-blue-100 font-medium rounded-md hover:bg-blue-100",
                            className,
                        )}>
                        <Icon
                            icon={icon}
                            // className={cn({
                            //     " text-blue-900": isCurrentPath,
                            // })}
                        />
                    </button>
                }>
                {label}
            </Tooltip>
        </div>
    );
};
