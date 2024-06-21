import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import graphqlLoader from "vite-plugin-graphql-loader";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), graphqlLoader()],
});
