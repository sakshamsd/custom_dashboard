import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/Dropdown";
import { Button } from "../../../components/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/Avatar";
import { ChevronDown, LogOut } from "lucide-react";

function Account() {
    return (
        <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src="/avatar.png"
                                alt="User avatar"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Account;
