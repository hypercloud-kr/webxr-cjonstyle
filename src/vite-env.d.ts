/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_HARS_API: string;
  readonly VITE_CUSTOM_API: string;
  readonly VITE_NODE_ENV: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
