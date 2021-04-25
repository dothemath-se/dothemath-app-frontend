import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      // This is a hack for socket.io client v2 (and maybe later versions too)
      // https://github.com/vitejs/vite/issues/490#issuecomment-784714022
      'socket.io-client': 'socket.io-client/dist/socket.io.js',
    },
  },
  build: {
    sourcemap: true,
  },
});
