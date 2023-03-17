import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs';

export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync('./.cert/key.pem'),
            cert: fs.readFileSync('./.cert/cert.pem'),
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    }
})
