import { LoginForm } from "@/components/auth/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-layout/login")({
    validateSearch: (search): { redirect?: string } => ({
        redirect:
            typeof search.redirect === "string" ? search.redirect : undefined,
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return <LoginForm />;
}
