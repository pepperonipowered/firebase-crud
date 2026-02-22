import { SignupForm } from "@/components/auth/signup-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth-layout/signup")({
    component: RouteComponent,
});

function RouteComponent() {
    return <SignupForm />;
}
