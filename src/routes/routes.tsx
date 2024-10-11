import { Suspense } from "react";
import { Route } from "react-router-dom";
import Spinner from "../common/Spinner";

export interface RouteProperties {
    path: string;
    element: React.ComponentType<any>;
    children?: RouteProperties[];
}

export const renderRoutes = (route: RouteProperties) => {
    if (route) {
        return (
            <Route
                path={route.path}
                key={route.path}
                element={
                    <Suspense fallback={<Spinner />}>
                        <route.element />
                    </Suspense>
                }
            >
                {route?.children?.map(child => renderRoutes(child))}
            </Route>
        );
    }
};