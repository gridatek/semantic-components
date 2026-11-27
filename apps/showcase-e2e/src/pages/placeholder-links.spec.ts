import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { expect, test } from '../test';

/**
 * A bare `#` link (`href="#"`, `href="#section"`) resolves against the
 * apps' `<base href="/">`: a click leaves for the home page. A demo's
 * placeholder link is the router's to this page instead —
 * `routerLink="."`, with `fragment` for a section.
 */
const root = join(__dirname, '../../../..');
const apps = ['apps/showcase/src/app', 'apps/styles/custom/src/app'];

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sources(path);
    // The containers' code is generated from their demos.
    return entry.name.endsWith('.ts') && !entry.name.endsWith('-container.ts')
      ? [path]
      : [];
  });
}

test('no bare # link in the apps: each a router link to its page', () => {
  const bare = apps
    .flatMap((app) => sources(join(root, app)))
    .flatMap((file) =>
      readFileSync(file, 'utf8')
        .split('\n')
        .flatMap((line, i) =>
          /\shref="#/.test(line)
            ? [`${relative(root, file).replace(/\\/g, '/')}:${i + 1}`]
            : [],
        ),
    );
  expect(bare).toEqual([]);
});
