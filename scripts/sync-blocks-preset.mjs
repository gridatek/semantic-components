#!/usr/bin/env node
// The blocks app's own preset (apps/blocks/src/app/blocks-nova) is nova under
// another name: the app shows how one brings a preset of its own. This copies
// nova's files there again — a new key, a changed class — and removes the ones
// nova no longer has. `nova.ts` becomes `blocks-nova.ts` (its export
// `blocksNova`); `index.ts` exports it.
//
//   node scripts/sync-blocks-preset.mjs           write the changes
//   node scripts/sync-blocks-preset.mjs --check   change nothing; exit 1 if behind
import {
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

const SOURCE = 'libs/presets/nova/src';
const TARGET = 'apps/blocks/src/app/blocks-nova';
const check = process.argv.includes('--check');

/** What each of nova's files becomes in the blocks app: its name and text. */
function copyOf(name, text) {
  if (name === 'nova.ts') {
    return {
      name: 'blocks-nova.ts',
      text: text.replace(
        /export const nova: ScPreset/,
        'export const blocksNova: ScPreset',
      ),
    };
  }
  if (name === 'index.ts') {
    return {
      name,
      text: text.replace(
        "export * from './nova';",
        "export * from './blocks-nova';",
      ),
    };
  }
  return { name, text };
}

const wanted = new Map(
  readdirSync(SOURCE)
    .filter((name) => name.endsWith('.ts'))
    .map((name) => copyOf(name, readFileSync(join(SOURCE, name), 'utf8')))
    .map(({ name, text }) => [name, text]),
);

const changed = [];
for (const [name, text] of wanted) {
  const path = join(TARGET, name);
  const current = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (current === text) continue;
  changed.push(`${current === null ? 'added' : 'updated'} ${name}`);
  if (!check) writeFileSync(path, text);
}
for (const name of readdirSync(TARGET)) {
  if (!name.endsWith('.ts') || wanted.has(name)) continue;
  changed.push(`removed ${name}`);
  if (!check) rmSync(join(TARGET, name));
}

if (!changed.length) {
  console.log('blocks-nova is in sync with nova.');
} else if (check) {
  console.error(
    `blocks-nova is behind nova (${changed.length}):\n  ${changed.join('\n  ')}`,
  );
  console.error('Run: node scripts/sync-blocks-preset.mjs');
  process.exit(1);
} else {
  console.log(
    `blocks-nova synced with nova (${changed.length}):\n  ${changed.join('\n  ')}`,
  );
}
