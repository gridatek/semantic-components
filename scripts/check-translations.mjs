// Checks an app's translations against its extracted messages: every
// `<locale>.json` in the folder has each message of `messages.json` (what
// `ng extract-i18n --format json` writes), no other, and the same
// placeholders (`{$INTERPOLATION}`, `{$START_TAG_SPAN}`…). Angular checks
// none of this when translations load at runtime.
//
//   node scripts/check-translations.mjs apps/blocks/public/i18n
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node scripts/check-translations.mjs <i18n folder>');
  process.exit(2);
}

const read = (file) =>
  JSON.parse(readFileSync(join(dir, file), 'utf8')).translations;
const placeholders = (text) =>
  (text.match(/\{\$[A-Za-z0-9_]+\}/g) ?? []).sort().join(' ');

const source = read('messages.json');
const files = readdirSync(dir).filter(
  (file) => file.endsWith('.json') && file !== 'messages.json',
);
const problems = [];

for (const file of files) {
  const translations = read(file);
  for (const id of Object.keys(source)) {
    if (!(id in translations)) problems.push(`${file}: missing "${id}"`);
    else if (placeholders(source[id]) !== placeholders(translations[id]))
      problems.push(
        `${file}: "${id}" has placeholders [${placeholders(translations[id])}], the source [${placeholders(source[id])}]`,
      );
  }
  for (const id of Object.keys(translations))
    if (!(id in source))
      problems.push(`${file}: "${id}" is no longer in the source`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(
  `${files.join(', ')}: all ${Object.keys(source).length} messages translated.`,
);
