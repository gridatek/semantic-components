#!/usr/bin/env node
// Refreshes docs/roadmap.md: the inventory line and the phase tables — each
// component's level (from the components it imports), size, library, shadcn
// counterpart, and whether it has e2e demo tests and an RTL demo. The ticks
// already set are kept; the rest of the document is left as it is.
//
//   node scripts/roadmap.mjs
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const at = (...parts) => join(root, ...parts);
const reference =
  process.env.SHADCN_REFERENCE ?? resolve(root, '..', 'shadcn-reference');

// shadcn counterparts under another name.
const ALIAS = {
  menu: 'dropdown-menu, menubar',
  'otp-field': 'input-otp',
  charts: 'chart',
};
// Components without a folder of their own: measured as another.
const SAME_AS = { 'date-range-picker': 'date-picker' };
const LIBRARIES = ['ui', 'code', 'charts'];

const registry = JSON.parse(
  readFileSync(at('apps/showcase/public/components.json'), 'utf8'),
);
const shadcn = existsSync(join(reference, 'presets/nova/src/components/ui'))
  ? new Set(
      readdirSync(join(reference, 'presets/nova/src/components/ui')).map((f) =>
        f.replace(/\.tsx$/, ''),
      ),
    )
  : new Set();
const e2e = new Set(readdirSync(at('apps/showcase-e2e/src/demos')));

const walk = (dir, files = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, files);
    else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts'))
      files.push(path);
  }
  return files;
};
const sourceDir = (path, lib) =>
  [
    `libs/${lib}/src/lib/components/${path}`,
    `libs/${lib}/src/lib/utilities/${path}`,
    `libs/${lib}/src/lib/layouts/${path}`,
    `libs/${lib}/${path}/src`,
    `libs/${path}/src`,
  ]
    .map((dir) => at(dir))
    .find(existsSync);

// The components: their files, size, demos.
const rows = registry.map((item) => {
  const path = SAME_AS[item.path] ?? item.path;
  const lib =
    registry.find((other) => other.path === path)?.library ?? item.library;
  const dir = sourceDir(path, lib);
  const files = dir ? walk(dir) : [];
  const demos = at('apps/showcase/src/app/pages/docs', item.path, 'demos');
  const rtl =
    existsSync(demos) &&
    readdirSync(demos).some((file) => file.startsWith('rtl-'));
  return {
    name: item.name,
    path: item.path,
    lib: item.library,
    files,
    size: files.reduce(
      (total, file) => total + readFileSync(file, 'utf8').split('\n').length,
      0,
    ),
    shadcn: ALIAS[item.path] ?? (shadcn.has(item.path) ? 'yes' : '—'),
    e2e: e2e.has(item.path),
    rtl,
  };
});

// Built on: the components whose exports a component imports.
const owner = new Map();
for (const row of rows)
  for (const file of row.files)
    for (const match of readFileSync(file, 'utf8').matchAll(
      /export (?:class|const|function) (\w+)/g,
    ))
      if (!owner.has(match[1])) owner.set(match[1], row.path);
for (const row of rows) {
  const deps = new Set();
  for (const file of row.files)
    for (const match of readFileSync(file, 'utf8').matchAll(
      /import\s*\{([^}]*)\}\s*from\s*'([^']+)'/g,
    )) {
      if (match[2].startsWith('./')) continue;
      for (const name of match[1]
        .split(',')
        .map((n) => n.trim().replace(/^type /, '')))
        if (
          owner.has(name) &&
          owner.get(name) !== row.path &&
          owner.get(name) !== SAME_AS[row.path]
        )
          deps.add(owner.get(name));
    }
  // The preset's button (`injectPreset().button`): built on the button.
  if (
    row.path !== 'button' &&
    row.files.some((file) =>
      readFileSync(file, 'utf8').includes('injectPreset().button'),
    )
  )
    deps.add('button');
  row.deps = [...deps].sort();
}
const level = new Map();
const levelOf = (path, seen = new Set()) => {
  if (level.has(path)) return level.get(path);
  if (seen.has(path)) return 1;
  seen.add(path);
  const row = rows.find((r) => r.path === path);
  let value = 1;
  for (const dep of row?.deps ?? [])
    value = Math.max(value, levelOf(dep, seen) + 1);
  level.set(path, value);
  return value;
};
for (const row of rows)
  row.level = SAME_AS[row.path]
    ? levelOf(SAME_AS[row.path])
    : levelOf(row.path);

// The ticks already set, by component.
const roadmapPath = at('docs/roadmap.md');
let roadmap = readFileSync(roadmapPath, 'utf8');
const ticks = new Map();
for (const line of roadmap.split('\n')) {
  const path = line.match(
    /\(\.\.\/apps\/showcase\/src\/app\/pages\/docs\/([\w-]+)\)/,
  )?.[1];
  if (!path) continue;
  const boxes = line
    .split('|')
    .map((cell) => cell.trim())
    .filter((cell) => /^\[[ x]\]$/.test(cell))
    .map((cell) => cell === '[x]');
  // A table from before the SSR column: SSR not ticked.
  if (boxes.length === 6) boxes.splice(5, 0, false);
  ticks.set(path, boxes);
}

const box = (done) => (done ? '[x]' : '[ ]');
const libOrder = (lib) => LIBRARIES.indexOf(lib);
const table = (list) =>
  [
    '| # | Component | Library | Built on | Size | shadcn | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |',
    '| -: | --- | --- | --- | -: | --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |',
    ...list
      .sort(
        (a, b) =>
          libOrder(a.lib) - libOrder(b.lib) ||
          a.size - b.size ||
          a.name.localeCompare(b.name),
      )
      .map((row, i) => {
        // [Styles, E2E, Mobile, RTL, Dark, SSR, Docs]: kept, or from the facts.
        const set = ticks.get(row.path) ?? [
          false,
          row.e2e,
          false,
          row.rtl,
          false,
          false,
          false,
        ];
        return `| ${i + 1} | [${row.name}](../apps/showcase/src/app/pages/docs/${row.path}) | ${row.lib} | ${row.deps.length ? row.deps.join(', ') : '—'} | ${row.size} | ${row.shadcn} | ${set.map(box).join(' | ')} |`;
      }),
  ].join('\n');

const byLevel = (n) => rows.filter((row) => row.level === n);
const organisms = rows.filter((row) => row.level >= 3);
const count = (key) =>
  rows.filter(
    (row) => row[key] === true || (key === 'shadcn' && row.shadcn !== '—'),
  ).length;

// The inventory line and the phase tables: replaced in place.
roadmap = roadmap.replace(
  /^Inventory \(.*$/m,
  `Inventory (${rows.length} components): ${count('shadcn')} with a shadcn counterpart · ${count('e2e')} with e2e demo tests · ${rows.length} with a page axe test · ${count('rtl')} with an RTL demo.`,
);
const replaceTable = (heading, list) => {
  const start = roadmap.indexOf(heading);
  if (start < 0) throw new Error(`missing: ${heading}`);
  // The table: from its header row (padded by prettier or not) to the first
  // line that isn't a row.
  const header = /^\|\s*#\s*\|/m;
  header.lastIndex = 0;
  const found = header.exec(roadmap.slice(start));
  if (!found) throw new Error(`no table after: ${heading}`);
  const tableStart = start + found.index;
  const rest = roadmap.slice(tableStart);
  const lastRow = rest.search(/\n(?!\|)/);
  const tableEnd = lastRow === -1 ? roadmap.length : tableStart + lastRow;
  roadmap =
    roadmap.slice(0, start) +
    roadmap.slice(start, tableStart).replace(/\(\d+\)/, `(${list.length})`) +
    table(list) +
    roadmap.slice(tableEnd);
};
replaceTable('## Phase 1 — Atoms', byLevel(1));
replaceTable('## Phase 2 — Molecules', byLevel(2));
replaceTable('## Phase 3 — Organisms', organisms);
writeFileSync(roadmapPath, roadmap);
console.log(
  `docs/roadmap.md: ${rows.length} components — ${byLevel(1).length} atoms, ${byLevel(2).length} molecules, ${organisms.length} organisms. Run prettier on it.`,
);
