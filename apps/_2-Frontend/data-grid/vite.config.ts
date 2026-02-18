import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const workspaceRoot = resolve(rootDir, '../../..');

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, workspaceRoot, '');

  return {
    envDir: workspaceRoot,
    plugins: [react(), tailwindcss()],
    server: {
      port: Number.parseInt(env.PORT_DATA_GRID || '3050', 10),
    },
  };
});
