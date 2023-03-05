import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import tsConfigPath from 'vite-tsconfig-paths';
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        tsConfigPath(),
        createStyleImportPlugin({
            resolves: [AntdResolve()],
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    }
})