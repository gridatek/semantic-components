import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'fs';
import { join, resolve } from 'path';

interface ComponentMeta {
  name: string;
  path: string;
  description: string;
  status: string;
  library: string;
  category: string;
  hidden?: boolean;
}

interface ComponentEntry {
  name: string;
  readme: string | null;
  exports: string[];
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

function loadVisibleComponentPaths(): Set<string> {
  const jsonPath = join(ROOT, 'apps', 'showcase', 'public', 'components.json');
  const allComponents: ComponentMeta[] = JSON.parse(
    readFileSync(jsonPath, 'utf-8'),
  );
  return new Set(allComponents.filter((c) => !c.hidden).map((c) => c.path));
}

function scanLibrary(
  libDir: string,
  packageName: string,
  visiblePaths: Set<string>,
): LibraryEntry {
  const componentsDir = join(libDir, 'src', 'lib', 'components');
  const components: ComponentEntry[] = [];

  if (!existsSync(componentsDir)) {
    return { name: packageName, components };
  }

  const entries = readdirSync(componentsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!visiblePaths.has(entry.name)) continue;

    const compDir = join(componentsDir, entry.name);
    const readmePath = join(compDir, 'README.md');
    const readme = existsSync(readmePath)
      ? readFileSync(readmePath, 'utf-8')
      : null;

    const exports = resolveExportsRecursively(compDir);

    components.push({
      name: entry.name,
      readme,
      exports,
    });
  }

  return { name: packageName, components };
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
  const libs: [string, string][] = [
    ['ui', '@semantic-components/ui'],
    ['ui-lab', '@semantic-components/ui-lab'],
    ['carousel', '@semantic-components/carousel'],
    ['code', '@semantic-components/code'],
    ['editor', '@semantic-components/editor'],
  ];

  const visiblePaths = loadVisibleComponentPaths();

  const libraries = libs.map(([dir, pkg]) =>
    scanLibrary(join(ROOT, 'libs', dir), pkg, visiblePaths),
  );

  const guides = scanGuides();

  // Read version from root ui package
  const uiPkg = JSON.parse(
    readFileSync(join(ROOT, 'libs', 'ui', 'package.json'), 'utf-8'),
  );

  const manifest: Manifest = {
    version: uiPkg.version,
    generatedAt: new Date().toISOString(),
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
