import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { basename, join, resolve } from 'node:path';

interface ComponentMeta {
  name: string;
  path: string;
  description: string;
  status: string;
  library: string;
  category: string;
  hidden?: boolean;
}

interface PartEntry {
  name: string;
  selector: string;
}

interface ComponentEntry {
  name: string;
  readme: string | null;
  exports: string[];
  /** Its components and directives, with their selectors, in export order. */
  parts: PartEntry[];
}

interface LibraryEntry {
  name: string;
  components: ComponentEntry[];
}

interface GuideEntry {
  name: string;
  title: string;
  content: string;
}

interface Manifest {
  version: string;
  generatedAt: string;
  libraries: LibraryEntry[];
  guides: GuideEntry[];
}

const ROOT = resolve(import.meta.dirname, '..', '..', '..');

function getExportedNames(filePath: string): string[] {
  if (!existsSync(filePath)) return [];

  const content = readFileSync(filePath, 'utf-8');
  const names: string[] = [];

  // Match "export class ClassName" and "export const constName"
  const classMatches = content.matchAll(/export\s+class\s+(\w+)/g);
  for (const m of classMatches) names.push(m[1]);

  const constMatches = content.matchAll(/export\s+const\s+(\w+)/g);
  for (const m of constMatches) names.push(m[1]);

  const typeMatches = content.matchAll(/export\s+type\s+(\w+)/g);
  for (const m of typeMatches) names.push(m[1]);

  const functionMatches = content.matchAll(/export\s+function\s+(\w+)/g);
  for (const m of functionMatches) names.push(m[1]);

  // Named re-exports: "export { A, B as C, type D } from './foo'" — each
  // name as exported (the alias, if any).
  const namedMatches = content.matchAll(
    /export\s+(?:type\s+)?\{([^}]*)\}\s+from\s+['"][^'"]+['"]/g,
  );
  for (const m of namedMatches)
    for (const part of m[1].split(',')) {
      const name = part
        .trim()
        .replace(/^type\s+/, '')
        .split(/\s+as\s+/)
        .pop();
      if (name) names.push(name);
    }

  return names;
}

function resolveExportsRecursively(dir: string): string[] {
  const indexPath = join(dir, 'index.ts');
  if (!existsSync(indexPath)) return [];

  const content = readFileSync(indexPath, 'utf-8');
  const allExports: string[] = [];

  // Handle "export * from './foo'" re-exports
  const reExports = content.matchAll(/export\s+\*\s+from\s+['"]([^'"]+)['"]/g);
  for (const m of reExports) {
    const relPath = m[1];
    const targetTs = join(dir, relPath + '.ts');
    const targetIndex = join(dir, relPath, 'index.ts');

    if (existsSync(targetTs)) {
      allExports.push(...getExportedNames(targetTs));
    } else if (existsSync(targetIndex)) {
      allExports.push(...resolveExportsRecursively(join(dir, relPath)));
    }
  }

  // Handle direct exports in this file
  allExports.push(...getExportedNames(indexPath));

  return allExports;
}

/**
 * The selectors of a folder's components and directives, by class name — read
 * from the code, so they are right whatever the README says.
 */
function getSelectors(dir: string, selectors = new Map<string, string>()) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) getSelectors(path, selectors);
    else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts')) {
      const content = readFileSync(path, 'utf-8');
      const matches = content.matchAll(
        /^@(?:Component|Directive)\(\{[\s\S]*?selector:\s*['"`]([^'"`]+)['"`][\s\S]*?export\s+class\s+(\w+)/gm,
      );
      for (const m of matches) selectors.set(m[2], m[1].replace(/\s+/g, ' '));
    }
  }
  return selectors;
}

function loadVisibleComponentPaths(): Set<string> {
  const jsonPath = join(ROOT, 'apps', 'showcase', 'public', 'components.json');
  const allComponents: ComponentMeta[] = JSON.parse(
    readFileSync(jsonPath, 'utf-8'),
  );
  return new Set(allComponents.filter((c) => !c.hidden).map((c) => c.path));
}

function scanDirectory(
  dir: string,
  visiblePaths: Set<string>,
): ComponentEntry[] {
  if (!existsSync(dir)) return [];

  const entries = readdirSync(dir, { withFileTypes: true });
  const results: ComponentEntry[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!visiblePaths.has(entry.name)) continue;

    const compDir = join(dir, entry.name);
    const readmePath = join(compDir, 'README.md');
    const readme = existsSync(readmePath)
      ? readFileSync(readmePath, 'utf-8')
      : null;

    const exports = resolveExportsRecursively(compDir);
    const selectors = getSelectors(compDir);

    results.push({
      name: entry.name,
      readme,
      exports,
      parts: exports.flatMap((name) => {
        const selector = selectors.get(name);
        return selector ? [{ name, selector }] : [];
      }),
    });
  }

  return results;
}

function scanLibrary(
  libDir: string,
  packageName: string,
  visiblePaths: Set<string>,
): LibraryEntry {
  const srcLib = join(libDir, 'src', 'lib');
  const components = [
    ...scanDirectory(join(srcLib, 'components'), visiblePaths),
    ...scanDirectory(join(srcLib, 'utilities'), visiblePaths),
  ];

  // Secondary entry points (`@semantic-components/ui/editor/tables`): their
  // exports belong to the library's component of the same name, whose README
  // documents them.
  const main = components.find((c) => c.name === basename(libDir));
  if (main) {
    for (const entry of readdirSync(libDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const entryDir = join(libDir, entry.name);
      if (!existsSync(join(entryDir, 'ng-package.json'))) continue;
      if (existsSync(join(entryDir, 'src', 'lib'))) continue;
      main.exports.push(...resolveExportsRecursively(join(entryDir, 'src')));
    }
  }

  return { name: packageName, components };
}

/**
 * Entry points that are libraries of their own (`@semantic-components/ui/editor`,
 * with a `src/lib` of components): scanned as such, under their import path —
 * and theirs in turn (`@semantic-components/ui/charts/treemap`).
 */
function scanEntryLibraries(
  libDir: string,
  packageName: string,
  visiblePaths: Set<string>,
): LibraryEntry[] {
  return readdirSync(libDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        existsSync(join(libDir, entry.name, 'ng-package.json')) &&
        existsSync(join(libDir, entry.name, 'src', 'lib')),
    )
    .flatMap((entry) => [
      scanLibrary(
        join(libDir, entry.name),
        `${packageName}/${entry.name}`,
        visiblePaths,
      ),
      ...scanEntryLibraries(
        join(libDir, entry.name),
        `${packageName}/${entry.name}`,
        visiblePaths,
      ),
    ]);
}

function scanGuides(): GuideEntry[] {
  const docsDir = join(ROOT, 'docs', 'guides');
  if (!existsSync(docsDir)) return [];

  const guides: GuideEntry[] = [];
  const files = readdirSync(docsDir).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const content = readFileSync(join(docsDir, file), 'utf-8');
    const name = file.replace(/\.md$/, '');

    // Extract first heading
    const headingMatch = content.match(/^#\s+(.+)$/m);
    const title = headingMatch ? headingMatch[1] : name;

    guides.push({ name, title, content });
  }

  return guides;
}

function main() {
  const libs: [string, string][] = [['ui', '@semantic-components/ui']];

  const visiblePaths = loadVisibleComponentPaths();

  const libraries = libs.flatMap(([dir, pkg]) => [
    scanLibrary(join(ROOT, 'libs', dir), pkg, visiblePaths),
    ...scanEntryLibraries(join(ROOT, 'libs', dir), pkg, visiblePaths),
  ]);

  const guides = scanGuides();

  // Read version from root ui package
  const uiPkg = JSON.parse(
    readFileSync(join(ROOT, 'libs', 'ui', 'package.json'), 'utf-8'),
  );

  const manifest: Manifest = {
    version: uiPkg.version,
    generatedAt: Temporal.Now.instant().toString(),
    libraries,
    guides,
  };

  const outDir = join(ROOT, 'libs', 'mcp-server', 'src', 'data');
  mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, 'manifest.json');
  writeFileSync(outPath, JSON.stringify(manifest, null, 2));

  // Print summary
  const totalComponents = libraries.reduce(
    (sum, lib) => sum + lib.components.length,
    0,
  );
  const withReadme = libraries.reduce(
    (sum, lib) => sum + lib.components.filter((c) => c.readme).length,
    0,
  );

  console.log(`Manifest generated: ${outPath}`);
  console.log(`  Libraries: ${libraries.length}`);
  console.log(`  Components: ${totalComponents} (${withReadme} with README)`);
  console.log(`  Guides: ${guides.length}`);
}

main();
