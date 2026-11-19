import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink, ScSeparator, ScTypeset } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { TocHeading } from '../../components/toc/toc-heading';

interface ScCodeSample {
  title: string;
  language: 'typescript' | 'css' | 'bash';
  code: string;
}

/** Your own style: copy one of ours into your app, rename it, change it. */
@Component({
  selector: 'app-custom-style-page',
  imports: [
    NgTemplateOutlet,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScTypeset,
    ScLink,
    ScSeparator,
    SiCheckIcon,
    SiCopyIcon,
    TocHeading,
  ],
  template: `
    <ng-template #sample let-s>
      <div scCodeBlock>
        <div scCodeBlockHeader>
          <div scCodeBlockTitle>{{ s.title }}</div>
          <div scCodeBlockActions>
            <button [scCodeBlockCopy]="s.code" #copy="scCodeBlockCopy">
              @if (copy.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
              <span class="sr-only">Copy to clipboard</span>
            </button>
          </div>
        </div>
        <pre scCodeBlockContent [code]="s.code" [language]="s.language"></pre>
      </div>
    </ng-template>

    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Custom style</h1>
        <p class="text-muted-foreground">
          A style is a plain object: every component's classes, typed by
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ScStyle</code>.
          To have your own look, start from one of ours: copy it into your app,
          give it your name, then change what you want. The components read it
          like any other style.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>1. Copy a style</h2>
        <p>
          Pick the style closest to what you want and copy its folder from
          <a scLink [href]="sourceUrl" target="_blank" rel="noopener noreferrer"
            >the repository</a
          >
          (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >libs/styles/nova/src</code
          >
          for nova) into your app. One file per component, plus the file that
          puts them together:
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: tree }"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scTypeset appToc>2. Name it</h2>
        <p>
          Rename the file that puts the parts together, and its export — the
          name is yours:
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: rename }"
        />
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: index }"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scTypeset appToc>3. Use it</h2>
        <p>
          Give it to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >provideSemanticComponents</code
          >
          when the app starts:
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: config }"
        />
        <p>
          Keep
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/styles</code
          >
          installed: your files import its types (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >import type</code
          >, nothing else), and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >class-variance-authority</code
          >, which you already have with the ui library. Tailwind scans your
          app's files, so the style's classes need no
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;source</code
          >
          — remove the one for the style you used before.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scTypeset appToc>4. Change it</h2>
        <p>
          Each file holds one component's classes, in Tailwind. Change a file,
          and every component that reads it follows — the cards and every framed
          box, for instance, take their corners, ring and shadow from
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">frame.ts</code>:
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: frame }"
        />
        <p>
          Some keys are variant functions (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >cva</code
          >, as in
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">button.ts</code
          >): change the classes of a variant, keep its name — the components
          ask for it by name. The
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ScStyle</code>
          type keeps you whole: a key missing or of the wrong shape doesn't
          compile.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Only a few changes?</h2>
        <p>
          Then no copy: spread one of ours and replace the keys you change. It
          keeps our updates for the rest — and its
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;source</code
          >
          line, since its classes still come from the package.
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: spread }"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Good to know</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A style is set when the app starts: switching it means reloading.
          </li>
          <li>
            A copied style is yours: it won't get the changes we make to ours.
            When you update the library, compare your files with the new ones of
            the style you started from — a new component brings a new key, which
            the type will ask for.
          </li>
          <li>
            The colors aren't in a style: they are your theme's CSS variables
            (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >--primary</code
            >,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--radius</code
            >…) in your
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >styles.css</code
            >. A style says how things are drawn; the theme, in which colors.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CustomStylePage {
  private readonly sourceUrl =
    'https://github.com/gridatek/semantic-components/tree/main/libs/styles/nova/src';

  private readonly tree: ScCodeSample = {
    title: 'src/app/my-style/',
    language: 'bash',
    code: `src/app/my-style/
├── accordion.ts
├── button.ts
├── card.ts
├── frame.ts
├── …            # one file per component
├── nova.ts      # puts them together
└── index.ts`,
  };

  private readonly rename: ScCodeSample = {
    title: 'my-style/my-style.ts (was nova.ts)',
    language: 'typescript',
    code: `import type { ScStyle } from '@semantic-components/styles';
import { accordion } from './accordion';
// … the other imports, unchanged

export const myStyle: ScStyle = {
  accordion,
  // … the other keys, unchanged
};`,
  };

  private readonly index: ScCodeSample = {
    title: 'my-style/index.ts',
    language: 'typescript',
    code: `export * from './my-style';`,
  };

  private readonly config: ScCodeSample = {
    title: 'app.config.ts',
    language: 'typescript',
    code: `import { provideSemanticComponents } from '@semantic-components/ui';
import { myStyle } from './my-style';

export const appConfig: ApplicationConfig = {
  providers: [provideSemanticComponents({ style: myStyle })],
};`,
  };

  private readonly frame: ScCodeSample = {
    title: 'my-style/frame.ts',
    language: 'typescript',
    code: `// The card's frame: its corners, ring and shadow.
export const frame = 'rounded-2xl shadow-sm ring-1 ring-foreground/10';

// A small box's frame (scFrame size="sm": a row, an icon's box).
export const frameSm = 'rounded-md ring-1 ring-border';`,
  };

  private readonly spread: ScCodeSample = {
    title: 'my-style.ts',
    language: 'typescript',
    code: `import type { ScStyle } from '@semantic-components/styles';
import { nova } from '@semantic-components/styles/nova';

export const myStyle: ScStyle = {
  ...nova,
  frame: 'rounded-2xl shadow-sm ring-1 ring-foreground/10',
};`,
  };
}
