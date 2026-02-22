import AppHeader from "@/components/app-header";
import { verifySession } from "@/lib/utils";
import {
    createFileRoute,
    isRedirect,
    Outlet,
    redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_app-layout")({
    beforeLoad: async ({ location }) => {
        try {
            const user = await verifySession();
            if (!user) {
                throw redirect({
                    to: "/login",
                    search: { redirect: location.href },
                });
            }
            return { user };
        } catch (error) {
            if (isRedirect(error)) throw error;
            throw redirect({
                to: "/login",
                search: { redirect: location.href },
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex min-h-screen w-full flex-col">
          <AppHeader />
            <Outlet />
        </div>
    );
}
