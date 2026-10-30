#!/usr/bin/env node
// Refreshes docs/roadmap.md: the inventory line and its two lists (in shadcn,
// not in shadcn) — each
// component's parts (components, directives, services), library, the components it is built on, shadcn
// counterpart, and whether it has e2e demo tests and an RTL demo. The ticks
// already set are kept, and so is the order of the rows: it is the user's work
// order, changed only by hand (a new component is added at the end of its
// list). The rest of the document is left as it is.
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
  // No link in shadcn: the Button's look on an <a> (its `render`).
  link: 'button',
  // shadcn's Button Group, named for what it joins.
  'control-group': 'button-group',
};
// Components without a folder of their own: measured as another.
const SAME_AS = {
  'date-range-picker': 'date-picker',
  // Its parts are the Data Table's (tree rows).
  'tree-table': 'data-table',
};
const LIBRARIES = ['ui'];

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
/**
 * The component folders inside a library's entry points
 * (`libs/ui/charts/src/lib/components/area-chart`, and in theirs:
 * `libs/ui/charts/treemap/src/lib/components/treemap-chart`), by name.
 */
const entryComponents = (lib) => {
  const found = new Map();
  const visit = (dir) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === 'node_modules') continue;
      const path = join(dir, entry.name);
      if (entry.name === 'components' && dir.endsWith(join('src', 'lib'))) {
        for (const component of readdirSync(path, { withFileTypes: true }))
          if (component.isDirectory() && !found.has(component.name))
            found.set(component.name, join(path, component.name));
      } else visit(path);
    }
  };
  visit(at('libs', lib));
  return found;
};
const entries = new Map(LIBRARIES.map((lib) => [lib, entryComponents(lib)]));
/** A component's code: its folder, or its one file (a layout). */
const sourceOf = (path, lib) =>
  [
    `libs/${lib}/src/lib/components/${path}`,
    `libs/${lib}/src/lib/utilities/${path}`,
    `libs/${lib}/src/lib/layouts/${path}`,
    `libs/${lib}/src/lib/layouts/${path}.ts`,
    `libs/${lib}/${path}/src`,
    `libs/${path}/src`,
  ]
    .map((dir) => at(dir))
    .find(existsSync) ?? entries.get(lib)?.get(path);

// The components: their files, parts, demos.
const rows = registry.map((item) => {
  const path = SAME_AS[item.path] ?? item.path;
  const lib =
    registry.find((other) => other.path === path)?.library ?? item.library;
  const source = sourceOf(path, lib);
  const files = !source ? [] : source.endsWith('.ts') ? [source] : walk(source);
  const demos = at('apps/showcase/src/app/pages/docs', item.path, 'demos');
  const rtl =
    existsSync(demos) &&
    readdirSync(demos).some((file) => file.startsWith('rtl-'));
  return {
    name: item.name,
    path: item.path,
    lib: item.library,
    files,
    // Its parts: the components, directives and services it declares.
    parts: files.reduce(
      (total, file) =>
        total +
        (readFileSync(file, 'utf8').match(/^@(Component|Directive|Service)\(/gm)
          ?.length ?? 0),
      0,
    ),
    shadcn: ALIAS[item.path] ?? (shadcn.has(item.path) ? 'yes' : '—'),
    e2e: e2e.has(item.path),
    rtl,
  };
});

// Built on: the components whose exports a component imports, and those whose
// `data-slot` its styles (or its preset's) read — a button group shapes the
// buttons, inputs and selects in it.
const presetFiles = readdirSync(at('libs/presets'), { withFileTypes: true })
  .filter((entry) => existsSync(at('libs/presets', entry.name, 'src')))
  .flatMap((entry) => walk(at('libs/presets', entry.name, 'src')));
/** The components declaring each `data-slot`. */
const declaring = new Map();
for (const row of rows)
  for (const file of row.files)
    for (const [, a, b] of readFileSync(file, 'utf8').matchAll(
      /'data-slot':\s*'([\w-]+)'|data-slot="([\w-]+)"/g,
    )) {
      const slot = a ?? b;
      if (!declaring.has(slot)) declaring.set(slot, new Set());
      declaring.get(slot).add(row.path);
    }
/**
 * The component a slot stands for: the one named after it (`select`), else
 * its only declarer — none for a role several share (`control`).
 */
const slotOwner = (slot) => {
  const paths = declaring.get(slot);
  if (!paths) return undefined;
  if (paths.has(slot)) return slot;
  return paths.size === 1 ? [...paths][0] : undefined;
};
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
  // A part's classes from the preset (`injectPreset().controlGroup`): built on
  // that part's component (`control-group`).
  const styles = [...row.files];
  for (const file of row.files)
    for (const [, part] of readFileSync(file, 'utf8').matchAll(
      /injectPreset\(\)\.(\w+)/g,
    )) {
      const path = part.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
      if (path !== row.path && rows.some((other) => other.path === path))
        deps.add(path);
      // Its own part's classes, in every preset: read for slots too.
      if (path === row.path)
        styles.push(
          ...presetFiles.filter((preset) =>
            new RegExp(`export const ${part}\\b`).test(
              readFileSync(preset, 'utf8'),
            ),
          ),
        );
    }
  // The slots its styles read in what it holds (`[&>[data-slot=select]]`,
  // `*:data-[slot=button]`, `has-[[data-slot=…]]`) — not those it adapts to
  // when inside another (`in-data-[slot=control-group]`, `group-…`, `peer-…`).
  for (const file of new Set(styles))
    for (const [token, slot] of readFileSync(file, 'utf8').matchAll(
      /[^\s'"`]*slot=([\w-]+)[^\s'"`]*/g,
    )) {
      if (/^(in-|group-|peer-|dark:in-)/.test(token)) continue;
      const path = slotOwner(slot);
      if (path && path !== row.path && path !== SAME_AS[row.path])
        deps.add(path);
    }
  row.deps = [...deps].sort();
}

// The ticks already set, by component.
const roadmapPath = at('docs/roadmap.md');
let roadmap = readFileSync(roadmapPath, 'utf8');
const ticks = new Map();
/**
 * CI, by component: `waiting` while its changes haven't been through a GitHub
 * Actions run; set and cleared by hand, kept here.
 */
const ci = new Map();
/**
 * The rows as they stand: the order is the user's work order, set by hand in
 * the document — never changed here.
 */
const listed = [];
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
  // A table from before the MCP column: MCP not ticked.
  if (boxes.length === 7) boxes.push(false);
  ticks.set(path, boxes);
  const last = line
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean)
    .at(-1);
  if (last === 'waiting') ci.set(path, last);
  if (!listed.includes(path)) listed.push(path);
}

const box = (done) => (done ? '[x]' : '[ ]');
/** A row's place: where it stands in the document; a new component last. */
const placeOf = (path) => {
  const at = listed.indexOf(path);
  return at === -1 ? Infinity : at;
};
/** A list's table; `shadcn`: with the shadcn counterpart's name (List 1). */
const table = (list, shadcn) =>
  [
    `| # | Component | Library | Built on | Parts |${shadcn ? ' shadcn |' : ''} Styles | E2E | Mobile | RTL | Dark | SSR | Docs | MCP | CI |`,
    `| -: | --- | --- | --- | -: |${shadcn ? ' --- |' : ''} :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |`,
    ...list
      // The user's order, as the document has it: kept. A component not yet
      // listed goes at the end (new ones among themselves by name).
      .sort((a, b) => {
        const [pa, pb] = [placeOf(a.path), placeOf(b.path)];
        if (pa !== pb) return pa - pb;
        return a.name.localeCompare(b.name);
      })
      .map((row, i) => {
        // [Styles, E2E, Mobile, RTL, Dark, SSR, Docs, MCP]: kept, or from the
        // facts.
        const set = ticks.get(row.path) ?? [
          false,
          row.e2e,
          false,
          row.rtl,
          false,
          false,
          false,
          false,
        ];
        return `| ${i + 1} | [${row.name}](../apps/showcase/src/app/pages/docs/${row.path}) | ${row.lib} | ${row.deps.length ? row.deps.join(', ') : '—'} | ${row.parts} |${shadcn ? ` ${row.shadcn} |` : ''} ${set.map(box).join(' | ')} | ${ci.get(row.path) ?? '—'} |`;
      }),
  ].join('\n');

const fromShadcn = rows.filter((row) => row.shadcn !== '—');
const ours = rows.filter((row) => row.shadcn === '—');
const count = (key) =>
  rows.filter(
    (row) => row[key] === true || (key === 'shadcn' && row.shadcn !== '—'),
  ).length;

// The inventory line and the phase tables: replaced in place.
roadmap = roadmap.replace(
  /^Inventory \(.*$/m,
  `Inventory (${rows.length} components): ${count('shadcn')} with a shadcn counterpart · ${count('e2e')} with e2e demo tests · ${rows.length} with a page axe test · ${count('rtl')} with an RTL demo.`,
);
const replaceTable = (heading, list, shadcn) => {
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
    table(list, shadcn) +
    roadmap.slice(tableEnd);
};
replaceTable('## List 1 — In shadcn', fromShadcn, true);
replaceTable('## List 2 — Not in shadcn', ours, false);
writeFileSync(roadmapPath, roadmap);
console.log(
  `docs/roadmap.md: ${rows.length} components — ${fromShadcn.length} in shadcn, ${ours.length} not. Run prettier on it.`,
);
