#!/usr/bin/env node
// Builds libs/styles/src/pdf-viewer.css — the PDF Viewer's stylesheet — from
// pdf.js's own (pdfjs-dist/web/pdf_viewer.css): what the pages need (their
// layers, pdf.js's editors, the page view), without pdf.js's application
// (its dialogs, sidebars, message bars…) and without its global
// `color-scheme`; without its images (the icons are yours: scPdfViewerIcon,
// your annotation toolbar), its cursors behind variables of ours; its colours
// on the theme's tokens (scripts/pdf-viewer-theme.css, appended). Run again when
// pdfjs-dist is upgraded, and compare.
//
//   node scripts/build-pdf-viewer-css.mjs [--list]
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as prettier from 'prettier';

const root = join(import.meta.dirname, '..');
const source = join(root, 'node_modules/pdfjs-dist/web/pdf_viewer.css');
const out = join(root, 'libs/styles/src/pdf-viewer.css');
const theme = join(root, 'scripts/pdf-viewer-theme.css');
const list = process.argv.includes('--list');

/** pdf.js's application, which the library's parts replace. */
const DROPPED = [
  /^\.(primaryButton|secondaryButton|messageBar|dialog|toggle-button|signatureDialog|commentPopup|commentPopupText|sidebar|treeView|popupMenu|newBadge|editorParamsToolbar|editDescription)\b/,
  /^#(editorUndoBar|addSignatureDialog|editSignatureDescriptionDialog|editorSignatureParamsToolbar|commentManagerDialog|editorCommentsSidebar|highlightParamsToolbarContainer|altTextSettingsDialog|outerContainer|viewsManager)\b/,
  /^button\.hasPopupMenu\b/,
];
/** :root blocks of the application's variables (its buttons, its dialogs). */
const DROPPED_ROOT_VARIABLES =
  /--button-primary-bg-color|--signature-|--dialog-/;

// The top-level blocks, each with the comments before it.
const lines = readFileSync(source, 'utf8').split('\n');
const blocks = [];
let current = [];
let depth = 0;
const licence = [];
let i = 0;
// pdf.js's licence header, kept.
while (i < lines.length && !lines[i].startsWith(':root'))
  licence.push(lines[i++]);
for (; i < lines.length; i++) {
  const line = lines[i];
  current.push(line);
  for (const c of line) {
    if (c === '{') depth++;
    if (c === '}') depth--;
  }
  if (depth === 0 && line.trim().endsWith('}')) {
    blocks.push(current);
    current = [];
  }
}
if (current.some((line) => line.trim())) blocks.push(current);

const selectorOf = (block) =>
  block
    .find(
      (line) =>
        line.trim() &&
        !line.trim().startsWith('/*') &&
        !line.trim().startsWith('*'),
    )
    ?.trim() ?? '';
const kept = [];
for (const block of blocks) {
  const selector = selectorOf(block);
  const text = block.join('\n');
  let drop = DROPPED.some((re) => re.test(selector));
  if (selector.startsWith(':root') && DROPPED_ROOT_VARIABLES.test(text))
    drop = true;
  // An @media block: dropped when everything in it is.
  if (selector.startsWith('@media')) {
    const inner = block
      .filter((line) => /^ {2}[.#:a-z[]/.test(line))
      .map((line) => line.trim());
    if (inner.length && inner.every((s) => DROPPED.some((re) => re.test(s)))) {
      drop = true;
    }
  }
  if (list) console.log(drop ? 'DROP' : 'keep', selector.slice(0, 90));
  if (!drop) kept.push(text);
}
if (list) process.exit(0);

/**
 * pdf.js's colours, on the theme's tokens (their dark values come with the
 * theme's \`.dark\`): its toolbars and tooltips on the pages as a popover,
 * focus as the ring, selected as primary. Only their normal values — a
 * \`light-dark()\`, a hex, an \`rgb()\` or one of Firefox's variables — are
 * replaced: the ones in pdf.js's forced-colours blocks (system colours)
 * stay.
 */
const SHADOW_SM =
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
const SHADOW_MD =
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
const TOKENS = {
  '--editor-toolbar-bg-color': 'var(--popover)',
  '--editor-toolbar-fg-color': 'var(--popover-foreground)',
  '--editor-toolbar-border-color': 'var(--border)',
  '--editor-toolbar-hover-bg-color': 'var(--accent)',
  '--editor-toolbar-focus-outline-color': 'var(--ring)',
  '--editor-toolbar-shadow': SHADOW_MD,
  '--alt-text-done-color': 'var(--popover-foreground)',
  '--alt-text-warning-color': 'var(--primary)',
  '--alt-text-tooltip-bg': 'var(--popover)',
  '--alt-text-tooltip-fg': 'var(--popover-foreground)',
  '--alt-text-tooltip-border': 'var(--border)',
  '--alt-text-tooltip-shadow': SHADOW_MD,
  '--no-alt-text-badge-border-color': 'var(--popover)',
  '--no-alt-text-badge-bg-color': 'var(--muted)',
  '--no-alt-text-badge-fg-color': 'var(--muted-foreground)',
  '--comment-button-bg': 'var(--popover)',
  '--comment-button-fg': 'var(--popover-foreground)',
  '--comment-button-active-bg': 'var(--primary)',
  '--comment-button-active-fg': 'var(--primary-foreground)',
  '--comment-button-hover-bg': 'var(--accent)',
  '--comment-button-hover-fg': 'var(--accent-foreground)',
  '--comment-button-selected-bg': 'var(--primary)',
  '--comment-button-selected-fg': 'var(--primary-foreground)',
  '--comment-button-border-color': 'var(--border)',
  '--comment-button-focus-border-color': 'var(--ring)',
  '--comment-button-focus-outline-color': 'var(--ring)',
  '--comment-button-box-shadow': SHADOW_SM,
  '--outline-color': 'var(--ring)',
  '--outline-around-color': 'var(--background)',
  '--hover-outline-color': 'var(--muted-foreground)',
  '--selected-outline-color': 'var(--ring)',
  '--swatch-border-color': 'var(--border)',
  '--focus-ring-color': 'var(--ring)',
  '--text-primary-color': 'var(--foreground)',
  '--link-fg-color': 'var(--primary)',
  '--link-hover-fg-color': 'var(--primary)',
};

let css = kept.join('\n');
const replaced = new Set();
css = css.replace(/(--[\w-]+):(\s*)([^;]*);/g, (all, name, space, value) => {
  if (!(name in TOKENS)) return all;
  if (!/light-dark\(|#[0-9a-fA-F]{3,8}\b|rgb\(|var\(--color-/.test(value))
    return all;
  replaced.add(name);
  return `${name}: ${TOKENS[name]};`;
});
const missing = Object.keys(TOKENS).filter((name) => !replaced.has(name));
if (missing.length)
  throw new Error('Not in pdf.js any more: ' + missing.join(', '));
// Corners: the theme's (rounded-md), not pdf.js's 6px.
css = css.replace(
  /border-radius: 6px;/g,
  'border-radius: calc(var(--radius) - 2px);',
);
// The page's own `color-scheme` (ScPresetManager's, the app's mode) rules:
// pdf.js's `light dark` would hand the browser's parts back to the system.
css = css.replace(/^\s*color-scheme: light dark;\n/gm, '');
/**
 * The library draws no icons: pdf.js's images go. Its icons on the pages are
 * your templates (`scPdfViewerIcon`: the comment button, the missing
 * alt-text badge, a page being drawn, the play button on media; your
 * annotation toolbar), and pdf.js's
 * pseudo-elements that drew them are off (pdf-viewer-theme.css).
 *
 * Its editing cursors are CSS — no template can be a cursor: pdf.js's
 * cursor without its image (`pointer`, `text`), behind a variable of ours
 * your CSS can set to one of yours (`--sc-pdf-viewer-ink-cursor: url(pen.svg)
 * 0 16, pointer;`).
 */
const CURSORS = {
  '--editorFreeText-editing-cursor': '--sc-pdf-viewer-freetext-cursor',
  '--editorInk-editing-cursor': '--sc-pdf-viewer-ink-cursor',
  '--editorHighlight-editing-cursor': '--sc-pdf-viewer-highlight-cursor',
  '--editorFreeHighlight-editing-cursor':
    '--sc-pdf-viewer-free-highlight-cursor',
};
const IMAGE_URL = /url\((["']?)images\/([^"')]+)\1\)/;

/** pdf.js's images out of a stylesheet; its cursors behind our variables. */
function dropImages(text) {
  // The cursors: pdf.js's own without its image (the keyword it falls back
  // to), behind ours.
  text = text.replace(
    /(--editor\w+-editing-cursor):\s*([^;]+);/g,
    (all, name, value) => {
      const ours = CURSORS[name];
      if (!ours) throw new Error('A cursor of pdf.js not known: ' + name);
      const keyword = value.trim().split(',').pop().trim();
      if (!/^[a-z-]+$/.test(keyword))
        throw new Error(`No cursor keyword in ${name}: ${value}`);
      return `${name}: var(${ours}, ${keyword});`;
    },
  );
  // A declaration whose value is one of its images: gone.
  text = text.replace(
    new RegExp(`^\\s*[\\w-]+:\\s*[^;]*${IMAGE_URL.source}[^;]*;\\n`, 'gm'),
    '',
  );
  // An icon pdf.js writes inline (the play button on embedded media): gone.
  text = text.replace(
    /^\s*background-image:\s*url\(["']?data:image\/svg\+xml,[^;]*;\n/gm,
    '',
  );
  if (IMAGE_URL.test(text)) {
    throw new Error('An image of pdf.js left: ' + text.match(IMAGE_URL)[0]);
  }
  return text;
}
css = dropImages(css);

const header = `/*
 * The PDF Viewer's stylesheet — import it in place of pdf.js's
 * (pdfjs-dist/web/pdf_viewer.css). Built by scripts/build-pdf-viewer-css.mjs
 * from pdf.js's: what the pages need (their text, annotation, XFA and
 * structure layers, pdf.js's annotation editors, the page view), without
 * pdf.js's application (its dialogs, sidebars, message bars, undo bar, its
 * toolbar buttons on an annotation: the library's parts are those) and
 * without its global \`:root { color-scheme: light dark }\` (pdf.js issue
 * 19886), and without pdf.js's images: the icons on the pages are yours
 * (scPdfViewerIcon). Its editing cursors are pdf.js's without images, each
 * behind a variable you can set to yours (its whole cursor value):
 * --sc-pdf-viewer-ink-cursor, --sc-pdf-viewer-highlight-cursor,
 * --sc-pdf-viewer-free-highlight-cursor, --sc-pdf-viewer-freetext-cursor.
 * Then the library's look, on the theme's tokens:
 * scripts/pdf-viewer-theme.css, below. Don't edit the part from pdf.js by hand:
 * change the script, or the theme part.
 */
`;
const built = [
  licence.join('\n').trim(),
  header,
  css.trim(),
  '',
  readFileSync(theme, 'utf8').trim(),
  '',
].join('\n');
// Formatted as the repository's files are: an upgrade's diff shows only
// what pdf.js changed.
const prettierOptions = (await prettier.resolveConfig(out)) ?? {};
writeFileSync(
  out,
  await prettier.format(built, { ...prettierOptions, filepath: out }),
);
console.log(`${out}: ${kept.length} of ${blocks.length} blocks`);
