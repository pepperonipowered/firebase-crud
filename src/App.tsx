import LoginPage from "./components/auth/login";
import SignupPage from "./components/auth/signup";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Toaster />
                <ModeToggle />
                <LoginPage />
            </ThemeProvider>
        </>
    );
}

export default App;
