import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path,
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.error('Proxy Error:', err);
                        res.writeHead(500, {
                            'Content-Type': 'application/json',
                        });
                        res.end(JSON.stringify({
                            error: 'Proxy connection failed. Backend server may not be running.',
                            details: err.message
                        }));
                    });
                }
            }
        }
    }
})
