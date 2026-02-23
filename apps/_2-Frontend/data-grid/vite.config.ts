import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '');

  return {
    envDir: rootDir,
    plugins: [react(), tailwindcss()],
    server: {
      host: env.APP_HOST || 'localhost',
      port: Number.parseInt(env.PORT_DATA_GRID || '3050', 10),
    },
  };
});
