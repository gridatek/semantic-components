import {
  InjectionToken,
  type Provider,
  makeEnvironmentProviders,
} from '@angular/core';
import type { HighlighterCore, LanguageInput } from 'shiki/core';

/** A piece of a line, and its colors (`--shiki-light`, `--shiki-dark`). */
export interface ScCodeToken {
  readonly content: string;
  readonly style: Readonly<Record<string, string>>;
}

/** Turns code into lines of tokens — or null, for a language it doesn't know. */
export interface ScCodeHighlighter {
  highlight(code: string, language: string): Promise<ScCodeToken[][] | null>;
}

/** The app's highlighter, if any: without one, code blocks show plain code. */
export const SC_CODE_HIGHLIGHTER = new InjectionToken<ScCodeHighlighter>(
  'SC_CODE_HIGHLIGHTER',
);

// Each language loads the first time it is used.
const languages: Record<string, LanguageInput> = {
  'angular-html': () => import('shiki/langs/angular-html.mjs'),
  'angular-ts': () => import('shiki/langs/angular-ts.mjs'),
  bash: () => import('shiki/langs/shellscript.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  scss: () => import('shiki/langs/scss.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
};

const aliases: Record<string, string> = {
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
};

/** Shiki (core, its JavaScript engine), GitHub light (high contrast: its tokens are 4.5:1 on the code's tints) and dark — loaded on the first block. */
function shikiHighlighter(): ScCodeHighlighter {
  let shiki: Promise<HighlighterCore> | undefined;
  const load = () =>
    (shiki ??= Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [
          import('shiki/themes/github-light-high-contrast.mjs'),
          import('shiki/themes/github-dark.mjs'),
        ],
        langs: [],
        engine: createJavaScriptRegexEngine({ forgiving: true }),
      }),
    ));

  return {
    async highlight(code, language) {
      const name = language.toLowerCase();
      const lang = name in languages ? name : aliases[name];
      if (!lang) return null;
      const highlighter = await load();
      if (!highlighter.getLoadedLanguages().includes(lang))
        await highlighter.loadLanguage(languages[lang]);
      return highlighter
        .codeToTokens(code, {
          lang,
          themes: { light: 'github-light-high-contrast', dark: 'github-dark' },
          defaultColor: false,
        })
        .tokens.map((line) =>
          line.map((token) => ({
            content: token.content,
            style: (token.htmlStyle ?? {}) as Record<string, string>,
          })),
        );
    },
  };
}

/** Highlights code blocks, with Shiki. */
export function provideCodeHighlighter(): ReturnType<
  typeof makeEnvironmentProviders
> {
  const provider: Provider = {
    provide: SC_CODE_HIGHLIGHTER,
    useFactory: shikiHighlighter,
  };
  return makeEnvironmentProviders([provider]);
}
