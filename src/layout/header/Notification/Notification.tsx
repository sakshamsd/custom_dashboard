import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../../components/Dropdown";
import { Button } from "../../../components/Button";
import { CrossIcon, FileWarning, Icon, SidebarClose } from "lucide-react";
import { Badge } from "../../../components/Badge/Badge";
import { ScrollArea } from "../../../components/ScrollArea/ScrollArea";
export const notificationItems = [
    {
        title: " SBOM ‘SBOMscan12’ contains outdated software components.",
        type: "error",
    },
    {
        title: "Unauthorized import of SBOM 'OpenSource_123' by Hillary Miller.",
        type: "warning",
    },
    {
        title: "SBOM 'Source_123' deleted by Hillary Miller.",
        type: "warning",
    },
    {
        title: "Licence for package 'ngnix' has expired.",
        type: "warning",
    },
    {
        title: "SBOM 'OpenSource_123' has been deleted by Hillary Miller.",
        type: "warning",
    },
    {
        title: "Unauthorized import of SBOM 'OpenSource_123' by Hillary Miller.",
        type: "warning",
    },
    {
        title: "SBOM 'ProjectXYZ' is no longer compliant with the organization's license policy",
        type: "warning",
    },
    {
        title: "SBOM scan for project 'ProjectABC' failed due to a server error. Please try again.",
        type: "error",
    },
    {
        title: "Licence for package 'ngnix' has expired.",
        type: "warning",
    },
    {
        title: "SBOM 'OpenSource_123' has been deleted by Hillary Miller.",
        type: "warning",
    },
    {
        title: "Unauthorized import of SBOM 'OpenSource_123' by Hillary Miller.",
        type: "warning",
    },
    {
        title: "SBOM 'ProjectXYZ' is no longer compliant with the organization's license policy",
        type: "warning",
    },
    {
        title: "SBOM scan for project 'ProjectABC' failed due to a server error. Please try again.",
        type: "error",
    },
];

export const Notifications = ({ numNotifications }: { numNotifications: number }) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative">
                        <SidebarClose />
                        <Badge className="text-white">{numNotifications}</Badge>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="w-[582px] h-[582px] bg-white px-3 py-4">
                        <div className="pb-5 flex justify-between items-center">
                            <div>
                                <p className="text-xl text-black-800 font-medium">Notifications</p>
                                <p className="text-xs text-black-700">
                                    {numNotifications <= 0
                                        ? "You have no new notifications"
                                        : `You have ${numNotifications} new notification${
                                              numNotifications > 1 ? "s" : ""
                                          }`}
                                </p>
                            </div>
                            <div>
                                <Button
                                    size="sm"
                                    variant="link">
                                    MARK ALL AS READ
                                </Button>
                            </div>
                        </div>
                        <ScrollArea className="h-[calc(100%-64px)] pr-5">
                            {notificationItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-[8px] flex px-[11px] justify-between items-center hover:bg-blue-100 cursor-pointer group mb-1">
                                    <div className="flex items-center gap-4 py-2">
                                        {item.type === "error" && <CrossIcon />}
                                        {item.type === "warning" && <FileWarning />}

                                        <p className="text-sm py-1">{item.title}</p>
                                    </div>
                                    <div className="w-2 h-2 bg-black-400 group-hover:bg-blue-800 rounded-full"></div>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
