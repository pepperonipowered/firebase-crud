import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), reactRouter()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
