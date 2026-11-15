#!/usr/bin/env node
// The showcase's settings (apps/showcase/public/config.json), which aren't in
// git (.gitignore): every workflow that builds the showcase writes them first,
// from one of these.
//
//   node scripts/showcase-config.mjs test   the e2e tests: every page, hidden ones too
//   node scripts/showcase-config.mjs dev    the dev site: the same
//   node scripts/showcase-config.mjs prod   the public site: no dev extras, no hidden pages
import { writeFileSync } from 'node:fs';

const SETTINGS = {
  test: { devMode: true, showHidden: true },
  dev: { devMode: true, showHidden: true },
  prod: { devMode: false, showHidden: false },
};

const name = process.argv[2];
const settings = SETTINGS[name];
if (!settings) {
  console.error(
    `Which settings? ${Object.keys(SETTINGS).join(', ')} (got: ${name ?? 'none'})`,
  );
  process.exit(1);
}
const path = 'apps/showcase/public/config.json';
writeFileSync(path, `${JSON.stringify(settings, null, 2)}\n`);
console.log(`${path}: ${name}`, settings);
