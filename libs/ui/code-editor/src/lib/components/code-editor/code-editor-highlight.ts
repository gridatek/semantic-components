import { HighlightStyle } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

/**
 * The code block's colors for CodeMirror's syntax: GitHub light (high
 * contrast), and GitHub dark (default) under `.dark` — the themes of
 * `withCodeHighlighter()`.
 */
export const codeEditorHighlight = HighlightStyle.define([
  {
    tag: [t.comment, t.meta],
    class: 'text-[#66707b] dark:text-[#8b949e]',
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
    class: 'text-[#a0111f] dark:text-[#ff7b72]',
  },
  {
    tag: [t.string, t.special(t.string), t.character, t.url],
    class: 'text-[#032563] dark:text-[#a5d6ff]',
  },
  {
    tag: [t.regexp, t.escape],
    class: 'text-[#032563] dark:text-[#a5d6ff]',
  },
  {
    tag: [t.number, t.bool, t.null, t.atom, t.self, t.color, t.labelName],
    class: 'text-[#023b95] dark:text-[#79c0ff]',
  },
  {
    tag: [t.function(t.variableName), t.function(t.propertyName), t.macroName],
    class: 'text-[#622cbc] dark:text-[#d2a8ff]',
  },
  {
    tag: [t.typeName, t.className, t.namespace],
    class: 'text-[#702c00] dark:text-[#ffa657]',
  },
  {
    tag: [t.definition(t.propertyName), t.attributeName],
    class: 'text-[#023b95] dark:text-[#d2a8ff]',
  },
  { tag: t.tagName, class: 'text-[#024c1a] dark:text-[#7ee787]' },
  {
    tag: t.heading,
    class: 'font-bold text-[#023b95] dark:text-[#79c0ff]',
  },
  { tag: t.strong, class: 'font-bold' },
  { tag: t.emphasis, class: 'italic' },
  { tag: t.link, class: 'underline' },
  { tag: t.strikethrough, class: 'line-through' },
  {
    tag: t.invalid,
    class: 'text-[#6e011a] italic dark:text-[#ffa198]',
  },
]);
