#!/usr/bin/env node
/**
 * Members are private unless something outside the class needs them.
 *
 * 1. Every instance member (field, method, accessor) of the Angular projects
 *    is made `private`, except what Angular requires to be visible:
 *    `input()`, `output()`, `model()` (NG1053), plus `static`, `abstract`,
 *    `override`, `declare` and decorated members, and ES `#fields`. In `libs`,
 *    the public members of parts with `exportAs`, of services and of plain
 *    classes stay public: they're the published API, used where the repo can't see.
 * 2. Every project is type-checked with `ngc` (templates included — Angular
 *    22.2+ lets a template read its own class's `private` members).
 * 3. Each visibility error loosens only the member it names: `protected` when
 *    the reader is a subclass, else public (no keyword). Repeat until clean.
 *
 * Usage:
 *   node scripts/tighten-visibility.mjs            # whole repo
 *   node scripts/tighten-visibility.mjs <path>...  # only tighten files under these paths
 *                                                  # (every project is still checked)
 */
import { execFile } from 'node:child_process';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify, stripVTControlCharacters } from 'node:util';
import { Node, Project, Scope, SyntaxKind } from 'ts-morph';

const run = promisify(execFile);
// ngc run by node itself: `npx` can't be spawned without a shell on Windows.
const NGC = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js',
);
// fileURLToPath, not URL.pathname: on Windows that is /D:/… (a doubled drive).
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PROJECTS = [
  'apps/showcase/tsconfig.app.json',
  'apps/blocks/tsconfig.app.json',
  'apps/dashboard/tsconfig.app.json',
  'apps/presets/sera/tsconfig.app.json',
  'libs/ui/tsconfig.lib.json',
  'libs/presets/tsconfig.lib.json',
];

const SOURCES = [
  'apps/showcase/src/**/*.ts',
  'apps/blocks/src/**/*.ts',
  'apps/dashboard/src/**/*.ts',
  'apps/presets/sera/src/**/*.ts',
  'libs/ui/**/src/**/*.ts',
  'libs/presets/src/**/*.ts',
  '!**/*.spec.ts',
  '!**/*.test.ts',
  '!**/node_modules/**',
];

/** Fields Angular reads as inputs/outputs: they can't be private (NG1053). */
const ANGULAR_API = /^(input|output|model|outputFromObservable)(\.required)?\b/;

const project = new Project({
  tsConfigFilePath: resolve(root, 'tsconfig.base.json'),
  skipAddingFilesFromTsConfig: true,
  skipFileDependencyResolution: true,
});
project.addSourceFilesAtPaths(
  SOURCES.map((g) =>
    g.startsWith('!') ? '!' + resolve(root, g.slice(1)) : resolve(root, g),
  ),
);

const scopes = process.argv.slice(2).map((p) => resolve(root, p));
// Relative paths: ts-morph's use `/`, resolve's `\` on Windows.
const inScope = (file) =>
  scopes.length === 0 ||
  scopes.some((s) => {
    const r = relative(s, file);
    return r === '' || (!r.startsWith('..') && !isAbsolute(r));
  });

/** className → ClassDeclaration[] (names repeat across demos). */
const classes = new Map();
for (const sf of project.getSourceFiles()) {
  for (const cls of sf.getDescendantsOfKind(SyntaxKind.ClassDeclaration)) {
    const name = cls.getName();
    if (!name) continue;
    if (!classes.has(name)) classes.set(name, []);
    classes.get(name).push(cls);
  }
}

const isMember = (m) =>
  Node.isPropertyDeclaration(m) ||
  Node.isMethodDeclaration(m) ||
  Node.isGetAccessorDeclaration(m) ||
  Node.isSetAccessorDeclaration(m);

function eligible(m) {
  if (!isMember(m)) return false;
  if (m.getNameNode().getKind() === SyntaxKind.PrivateIdentifier) return false;
  if (m.isStatic?.() || m.isAbstract?.() || m.hasOverrideKeyword?.())
    return false;
  if (Node.isPropertyDeclaration(m) && m.hasDeclareKeyword()) return false;
  if (m.getDecorators().length > 0) return false;
  if (Node.isMethodDeclaration(m) && m.isOverload()) return false;
  if (Node.isPropertyDeclaration(m)) {
    const init = m.getInitializer()?.getText() ?? '';
    if (ANGULAR_API.test(init)) return false;
  }
  return true;
}

/**
 * A published library's API the repo can't see used: the public members of a
 * part with `exportAs` (read through `#ref="scX"`), of a service, of a plain
 * class (a ref an app holds, an object handed to a third-party library).
 */
function isLibraryApi(cls) {
  // ts-morph's paths use `/`; `root` uses `\` on Windows: compare relatively.
  const path = relative(root, cls.getSourceFile().getFilePath());
  if (!/^libs[\\/]/.test(path)) return false;
  const decorator = cls
    .getDecorators()
    .find((d) => ['Component', 'Directive', 'Pipe'].includes(d.getName()));
  if (!decorator) return true;
  const options = decorator.getArguments()[0];
  return (
    Node.isObjectLiteralExpression(options) &&
    options.getProperty('exportAs') !== undefined
  );
}

// 1. Tighten.
let tightened = 0;
for (const sf of project.getSourceFiles()) {
  if (!inScope(sf.getFilePath())) continue;
  for (const cls of sf.getDescendantsOfKind(SyntaxKind.ClassDeclaration)) {
    const api = isLibraryApi(cls);
    for (const m of cls.getMembers()) {
      if (!eligible(m) || m.getScope() === Scope.Private) continue;
      if (api && m.getScope() === Scope.Public) continue;
      m.setScope(Scope.Private);
      tightened++;
    }
  }
}
await project.save();
console.log(`tightened ${tightened} members`);

// 2–3. Check and loosen until clean.
const rank = { private: 0, protected: 1, public: 2 };

function membersOf(cls, name) {
  return cls.getMembers().filter((m) => isMember(m) && m.getName() === name);
}

/** Loosen `name` on every class called `className` to at least `level`. */
function loosen(className, name, level) {
  className = className.replace(/<.*$/s, '').trim();
  let changed = false;
  for (const cls of classes.get(className) ?? []) {
    for (const m of membersOf(cls, name)) {
      const current = m.getScope() ?? 'public';
      if (rank[current] >= rank[level]) continue;
      m.setScope(level === 'public' ? undefined : Scope.Protected);
      console.log(`  ${className}.${name}: ${current} → ${level}`);
      changed = true;
    }
  }
  return changed;
}

function scopeOf(className, name) {
  className = className.replace(/<.*$/s, '').trim();
  for (const cls of classes.get(className) ?? []) {
    for (const m of membersOf(cls, name)) return m.getScope() ?? 'public';
  }
  return undefined;
}

/** Names of the classes `cls` extends, nearest first. */
function ancestors(cls, seen = new Set()) {
  const out = [];
  const base = cls
    .getExtends()
    ?.getExpression()
    .getText()
    .replace(/<.*$/s, '')
    .split('.')
    .pop();
  if (!base || seen.has(base)) return out;
  seen.add(base);
  out.push(base);
  for (const c of classes.get(base) ?? []) out.push(...ancestors(c, seen));
  return out;
}

/** Member names of the interfaces (or object type aliases) called `name`. */
function interfaceMembers(name) {
  const names = new Set();
  for (const sf of project.getSourceFiles()) {
    for (const i of sf.getInterfaces()) {
      if (i.getName() === name)
        for (const m of i.getMembers()) if (m.getName) names.add(m.getName());
    }
    for (const t of sf.getTypeAliases()) {
      if (t.getName() !== name) continue;
      for (const m of t
        .getTypeNode()
        ?.getDescendantsOfKind(SyntaxKind.PropertySignature) ?? [])
        names.add(m.getName());
      for (const m of t
        .getTypeNode()
        ?.getDescendantsOfKind(SyntaxKind.MethodSignature) ?? [])
        names.add(m.getName());
    }
  }
  return names;
}

function classAt(file, line, col) {
  const sf = project.getSourceFile(file);
  if (!sf) return undefined;
  const lines = sf.compilerNode.getLineStarts();
  if (line - 1 >= lines.length) return undefined;
  const pos = Math.min(
    lines[line - 1] + col - 1,
    (lines[line] ?? sf.getEnd()) - 1,
  );
  return sf
    .getDescendantAtPos(pos)
    ?.getFirstAncestorByKind(SyntaxKind.ClassDeclaration);
}

async function check(tsconfig) {
  try {
    await run(process.execPath, [NGC, '-p', tsconfig, '--noEmit'], {
      cwd: root,
      maxBuffer: 1 << 28,
    });
    return [];
  } catch (e) {
    // ngc always prints the pretty format: `file:line:col - error CODE: message`,
    // the message chain on the next indented lines, a blank line, a code frame.
    const base = dirname(resolve(root, tsconfig));
    const output = stripVTControlCharacters(e.stdout + e.stderr);
    const diags = [];
    let open = false;
    // \r\n on Windows: `.` stops at the \r, so split on both.
    for (const line of output.split(/\r?\n/)) {
      const m = /^(.+?):(\d+):(\d+) - error (\w+): (.*)$/.exec(line);
      if (m) {
        diags.push({
          file: resolve(base, m[1]),
          line: +m[2],
          col: +m[3],
          code: m[4],
          text: m[5],
        });
        open = true;
      } else if (open && line.trim() === '') open = false;
      else if (open) diags.at(-1).text += '\n' + line.trim();
    }
    if (diags.length === 0)
      throw new Error(
        `ngc failed on ${tsconfig} without errors to read:\n${output}`,
        { cause: e },
      );
    return diags;
  }
}

for (let pass = 1; ; pass++) {
  console.log(`pass ${pass}: type-checking ${PROJECTS.length} projects…`);
  const [first, ...rest] = PROJECTS;
  const results = await Promise.all([
    check(first),
    (async () => {
      const all = [];
      for (const p of rest) all.push(...(await check(p)));
      return all;
    })(),
  ]);
  const diags = results.flat();
  if (diags.length === 0) {
    console.log('clean');
    break;
  }

  // Find each error's class before any edit moves the positions.
  for (const d of diags) d.reader = classAt(d.file, d.line, d.col);

  let changed = false;
  const unhandled = [];
  for (const d of diags) {
    let handled = false;
    let m;
    if (
      (m =
        /Property '([^']+)' is private and only accessible within class '([^']+)'/.exec(
          d.text,
        ))
    ) {
      const [, name, owner] = m;
      const reader = d.reader;
      const ownerName = owner.replace(/<.*$/s, '');
      const sub =
        reader &&
        reader.getName() !== ownerName &&
        ancestors(reader).includes(ownerName);
      changed = loosen(owner, name, sub ? 'protected' : 'public') || changed;
      handled = true;
    }
    if (
      (m =
        /Property '([^']+)' is protected and only accessible (within|through an instance of) class '([^']+)'/.exec(
          d.text,
        ))
    ) {
      const [, name, , owner] = m;
      const owners = [owner];
      // "through an instance of class 'Sub'": the member is declared on a base.
      for (const c of classes.get(owner.replace(/<.*$/s, '')) ?? [])
        owners.push(...ancestors(c));
      for (const o of owners) changed = loosen(o, name, 'public') || changed;
      handled = true;
    }
    for (const mm of d.text.matchAll(
      /Property '([^']+)' is (private|protected) in type '([^'<]+)[^']*' but (?:not in|public in) type '([^'<]+)[^']*'/g,
    )) {
      const [, name, , a, b] = mm;
      const level = scopeOf(b, name) === 'protected' ? 'protected' : 'public';
      changed = loosen(a, name, level) || changed;
      handled = true;
    }
    for (const mm of d.text.matchAll(
      /Class '([^'<]+)[^']*' incorrectly (?:extends base class|implements interface) '[^']+'\.\s*Property '([^']+)' is private in type/g,
    )) {
      changed = loosen(mm[1], mm[2], 'public') || changed;
      handled = true;
    }
    // `Highlightable & ScCommandItem`: an interface's member that the class made private.
    for (const mm of d.text.matchAll(
      /The intersection '([^']+)' was reduced to 'never' because property '([^']+)' exists in multiple constituents and is private in some/g,
    )) {
      for (const part of mm[1].split(' & '))
        changed =
          loosen(part.replace(/<.*$/s, '').trim(), mm[2], 'public') || changed;
      handled = true;
    }
    // `ref === this` where `ref` is an interface the class meets structurally:
    // the interface's members are read from outside, so they're public.
    if (
      (m = /the types '([^']+)' and '([^']+)' have no overlap/.exec(d.text))
    ) {
      const reader = d.reader;
      const sides = [m[1], m[2]];
      const self = sides.find((s) => s === 'this' || s === reader?.getName());
      const other = sides.find((s) => s !== self);
      if (reader && self && other) {
        for (const name of other.split(' | ').map((s) => s.trim())) {
          for (const member of interfaceMembers(name))
            changed = loosen(reader.getName(), member, 'public') || changed;
        }
        handled = true;
      }
    }
    // Follow-on errors of the ones above: they go once those are fixed.
    if (/^TS(7022|7024|2339)$/.test(d.code) && /never|implicitly/.test(d.text))
      handled = true;
    if (!handled) unhandled.push(d);
  }
  await project.save();

  if (unhandled.length) {
    console.log(`\n${unhandled.length} errors the script can't place:`);
    for (const d of unhandled)
      console.log(
        `${relative(root, d.file)}(${d.line},${d.col}) ${d.code}: ${d.text}\n`,
      );
  }
  if (!changed) {
    console.log('no member loosened in this pass: stopping');
    process.exitCode = 1;
    break;
  }
}
