import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import * as path from 'node:path';

const devConfig = {
  VITE_HARS_API: 'https://api.dev.hars.kr',
  VITE_CUSTOM_API: 'https://custom.dev.hars.kr',
  VITE_NODE_ENV: 'development',
};

const prodConfig = {
  VITE_HARS_API: 'https://api.hars.kr',
  VITE_CUSTOM_API: 'https://custom.hars.kr',
  VITE_NODE_ENV: 'production',
};

const getConfig = (mode: string) => {
  return mode === 'development' ? devConfig : prodConfig;
};

const getMetaEnv = (mode: string) => {
  const env = {
    ...getConfig(mode),
  };

  return Object.keys(env).reduce(
    (acc, key) => {
      acc[`import.meta.env.${key}`] = JSON.stringify(
        env[key as keyof typeof env]
      );
      return acc;
    },
    {} as Record<string, string>
  );
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      mkcert(),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
        { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
        { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
        {
          find: '@common',
          replacement: path.resolve(__dirname, 'src/common/src'),
        },
      ],
    },
    server: {
      https: true as never,
      host: 'local.hyper-cloud.kr',
      port: 4000,
    },
    define: {
      ...getMetaEnv(mode),
    },
  };
});
