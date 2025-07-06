import { lazy } from "react";
import { routePaths } from "./route-path";
import { RouteProperties } from "./routes";

const BaseLayout = lazy(() => import("../BaseLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const PageNotFound = lazy(() => import("../common/PageNotFound"));

const rootRoute: RouteProperties[] = [
    {
        path: routePaths.root,
        element: BaseLayout,
        children: [
            {
                path: routePaths.root,
                element: Dashboard,
            },
            {
                path: routePaths.profile,
                element: Profile,
            },
            {
                path: routePaths.settings,
                element: Settings,
            },
        ],
    },
    { path: "*", element: PageNotFound },
];

export default rootRoute;
