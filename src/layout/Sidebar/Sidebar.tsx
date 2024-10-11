import { IconNode } from "lucide-react";
import Toggler from "./Toggler";
import Copyright from "./Copyright";
import { SidebarItem } from "./SidebarItem";

export type SidebarItemType = {
    labelKey?: string;
    label?: string;
    path: string;
    icon: IconNode;
};
type SidebarProps = {
    itemList: SidebarItemType[];
    isLabelShown: boolean;
    setIsLabelShown: () => void;
};

export const Sidebar = ({ itemList, isLabelShown, setIsLabelShown }: SidebarProps) => {
    return (
        <aside
            className={`flex flex-col transition-all group border-r-[1px] border-black-500 w-[78px] prevent-select fixed top-0 pt-[7.5rem] h-full z-10 ${
                isLabelShown ? "md:w-[12.75rem]" : ""
            }`}>
            <Toggler
                isLabelShown={isLabelShown}
                setIsLabelShown={setIsLabelShown}
            />
            <div className="grow text-center">
                <div className="p-3 relative">
                    {itemList?.map((item, ind) => {
                        return (
                            <SidebarItem
                                isLabelShown={isLabelShown}
                                {...item}
                                key={item.labelKey || item.label}
                            />
                        );
                    })}
                </div>
            </div>
            {isLabelShown && <Copyright />}
        </aside>
    );
};
