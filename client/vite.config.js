import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function svgFallbackPlugin() {
  return {
    name: 'svg-fallback-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) && req.url.startsWith('/images/')) {
          req.url = req.url.replace(/\.jpe?g$/, '.svg');
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

