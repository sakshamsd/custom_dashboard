import React from "react";

import { Notifications } from "./Notification/Notification";
import Account from "./Account/Account";

const Header: React.FC = () => {
    return (
        <header className="w-full flex justify-between items-center px-8 py-3 border-b-[1px] border-black-500 bg-white z-20 fixed top-0 h-[4.5rem]">
            <div className="flex justify-between flex-1">
                <div className="flex center">Dashboard</div>
                <div className="flex center">
                    <Notifications numNotifications={5} />
                    <Account />
                </div>
            </div>
        </header>
    );
};

export default Header;
