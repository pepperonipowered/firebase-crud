import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_app-layout/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate({ to: "/login" });
        } catch {
            toast.error("Failed to log out. Please try again.");
        }
    };
    return (
        <div>
            <h1>Hello "/dashboard"!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
