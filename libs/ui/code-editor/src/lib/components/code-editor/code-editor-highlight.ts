import { HighlightStyle } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

/**
 * The code block's colors for CodeMirror's syntax: GitHub light (high
 * contrast), and GitHub dark under `.dark` — the themes of
 * `provideCodeHighlighter()`.
 */
export const codeEditorHighlight = HighlightStyle.define([
  {
    tag: [t.comment, t.meta],
    class: 'text-[#66707b] dark:text-[#6a737d]',
  },
  {
    tag: [
      t.keyword,
      t.modifier,
      t.operator,
      t.operatorKeyword,
      t.unit,
      t.special(t.variableName),
    ],
    class: 'text-[#a0111f] dark:text-[#f97583]',
  },
  {
    tag: [t.string, t.special(t.string), t.character, t.url],
    class: 'text-[#032563] dark:text-[#9ecbff]',
  },
  {
    tag: [t.regexp, t.escape],
    class: 'text-[#032563] dark:text-[#dbedff]',
  },
  {
    tag: [t.number, t.bool, t.null, t.atom, t.self, t.color, t.labelName],
    class: 'text-[#023b95] dark:text-[#79b8ff]',
  },
  {
    tag: [t.function(t.variableName), t.function(t.propertyName), t.macroName],
    class: 'text-[#622cbc] dark:text-[#b392f0]',
  },
  {
    tag: [t.typeName, t.className, t.namespace],
    class: 'text-[#702c00] dark:text-[#b392f0]',
  },
  {
    tag: [t.definition(t.propertyName), t.attributeName],
    class: 'text-[#023b95] dark:text-[#b392f0]',
  },
  { tag: t.tagName, class: 'text-[#024c1a] dark:text-[#85e89d]' },
  {
    tag: t.heading,
    class: 'font-bold text-[#023b95] dark:text-[#79b8ff]',
  },
  { tag: t.strong, class: 'font-bold' },
  { tag: t.emphasis, class: 'italic' },
  { tag: t.link, class: 'underline' },
  { tag: t.strikethrough, class: 'line-through' },
  {
    tag: t.invalid,
    class: 'text-[#6e011a] italic dark:text-[#fdaeb7]',
  },
]);
