import * as React from "react";
import { Outlet, createRootRoute, createRootRouteWithContext } from "@tanstack/react-router";
import type { User } from "firebase/auth";

interface RouterContext {
    user: User | null;
    loading: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
});




function RootComponent() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
}
