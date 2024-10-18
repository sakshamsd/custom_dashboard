import { Outlet } from "react-router-dom";
import TopNavigation from "./layout/header/Header";
import { Sidebar } from "./layout/Sidebar";
import { routePaths } from "./routes/route-path";
import { IconNode } from "lucide-react";
import { layoutGridMoveHorizontal } from "@lucide/lab";
import { useState } from "react";



export interface ISidebarList {
    label: string;
    icon: IconNode;
    path: string;
}
const SIDEBAR_LIST: Array<ISidebarList> = [
    {
        label: "Dashboard",
        icon: layoutGridMoveHorizontal,
        path: routePaths.root,
    },
    {
        label: "Settings",
        icon: layoutGridMoveHorizontal,
        path: routePaths.settings,
    },
];

function BaseLayout() {
    const [isLabelShown, setIsLabelShown] = useState(true);

    return (
        <div className="flex h-screen flex-col">
            <TopNavigation />
            <div className="flex flex-1">
                <Sidebar
                    itemList={SIDEBAR_LIST}
                    setIsLabelShown={() => setIsLabelShown(!isLabelShown)}
                    isLabelShown={isLabelShown}
                />

                <div className="flex-1 overflow-auto ">
                    <div
                        className={`pl-[78px] h-full pt-[4.5rem]  ${
                            isLabelShown ? "md:pl-[12.75rem]" : ""
                        } `}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseLayout;
