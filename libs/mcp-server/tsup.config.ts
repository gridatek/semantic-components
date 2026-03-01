import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['libs/mcp-server/src/index.ts'],
  format: ['esm'],
  clean: true,
  dts: false,
  banner: {
    js: '#!/usr/bin/env node',
  },
  loader: {
    '.json': 'json',
  },
});
