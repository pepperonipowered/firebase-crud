import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./context/auth-provider.";

const router = createRouter({ routeTree, context: { user: null, loading: true } });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const { user, loading } = useAuth();
    return (
        <AuthProvider>
            <RouterProvider router={router} context={{user, loading}} />
        </AuthProvider>
    );
}

export default App;
