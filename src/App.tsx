import LoginPage from "./components/auth/login";
import SignupPage from "./components/auth/signup";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    
    return (
        <RouterProvider router={router} />
        // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        //     <Toaster />
        //     <ModeToggle />
        //     <LoginPage />
        // </ThemeProvider>
    );
}

export default App;
