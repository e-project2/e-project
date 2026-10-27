import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import fs from 'fs';
import path from 'path';

function svgFallbackPlugin() {
  return {
    name: 'svg-fallback-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) && req.url.startsWith('/images/')) {
          const cleanUrl = req.url.split('?')[0];
          const localPath = path.resolve(process.cwd(), 'public', cleanUrl.replace(/^\//, ''));
          if (!fs.existsSync(localPath)) {
            req.url = req.url.replace(/\.jpe?g$/, '.svg');
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), svgFallbackPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});

