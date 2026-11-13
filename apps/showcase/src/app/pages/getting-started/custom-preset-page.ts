import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading, ScLink, ScSeparator } from '@semantic-components/ui';
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

/** Your own preset: copy one of ours into your app, rename it, change it. */
@Component({
  selector: 'app-custom-preset-page',
  imports: [
    NgTemplateOutlet,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScHeading,
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
        <h1 scHeading>Custom preset</h1>
        <p class="text-muted-foreground">
          A preset is a plain object: every component's classes, typed by
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ScPreset</code>.
          To have your own look, start from one of ours: copy it into your app,
          give it your name, then change what you want. The components read it
          like any other preset.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Copy a preset</h2>
        <p class="text-muted-foreground">
          Pick the style closest to what you want and copy its folder from
          <a scLink [href]="sourceUrl" target="_blank" rel="noopener noreferrer"
            >the repository</a
          >
          (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >libs/presets/nova/src</code
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
        <h2 scHeading appToc>2. Name it</h2>
        <p class="text-muted-foreground">
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
        <h2 scHeading appToc>3. Use it</h2>
        <p class="text-muted-foreground">
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
        <p class="text-muted-foreground">
          Keep
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/presets</code
          >
          installed: your files import its types (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >import type</code
          >, nothing else), and
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >class-variance-authority</code
          >, which you already have with the ui library. Tailwind scans your
          app's files, so the preset's classes need no
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;source</code
          >
          — remove the one for the preset you used before.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>4. Change it</h2>
        <p class="text-muted-foreground">
          Each file holds one component's classes, in Tailwind. Change a file,
          and every component that reads it follows — the cards and every framed
          box, for instance, take their corners, ring and shadow from
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">frame.ts</code>:
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: frame }"
        />
        <p class="text-muted-foreground">
          Some keys are variant functions (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >cva</code
          >, as in
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">button.ts</code
          >): change the classes of a variant, keep its name — the components
          ask for it by name. The
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ScPreset</code>
          type keeps you whole: a key missing or of the wrong shape doesn't
          compile.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Only a few changes?</h2>
        <p class="text-muted-foreground">
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
        <h2 scHeading appToc>Good to know</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A preset is set when the app starts: switching it means reloading.
          </li>
          <li>
            A copied preset is yours: it won't get the changes we make to ours.
            When you update the library, compare your files with the new ones of
            the style you started from — a new component brings a new key, which
            the type will ask for.
          </li>
          <li>
            The colors aren't in a preset: they are your theme's CSS variables
            (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >--primary</code
            >,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--radius</code
            >…) in your
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >styles.css</code
            >. A preset says how things are drawn; the theme, in which colors.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CustomPresetPage {
  protected readonly sourceUrl =
    'https://github.com/gridatek/semantic-components/tree/main/libs/presets/nova/src';

  protected readonly tree: ScCodeSample = {
    title: 'src/app/my-preset/',
    language: 'bash',
    code: `src/app/my-preset/
├── accordion.ts
├── button.ts
├── card.ts
├── frame.ts
├── …            # one file per component
├── nova.ts      # puts them together
└── index.ts`,
  };

  protected readonly rename: ScCodeSample = {
    title: 'my-preset/my-preset.ts (was nova.ts)',
    language: 'typescript',
    code: `import type { ScPreset } from '@semantic-components/presets';
import { accordion } from './accordion';
// … the other imports, unchanged

export const myPreset: ScPreset = {
  accordion,
  // … the other keys, unchanged
};`,
  };

  protected readonly index: ScCodeSample = {
    title: 'my-preset/index.ts',
    language: 'typescript',
    code: `export * from './my-preset';`,
  };

  protected readonly config: ScCodeSample = {
    title: 'app.config.ts',
    language: 'typescript',
    code: `import { provideSemanticComponents } from '@semantic-components/ui';
import { myPreset } from './my-preset';

export const appConfig: ApplicationConfig = {
  providers: [provideSemanticComponents({ preset: myPreset })],
};`,
  };

  protected readonly frame: ScCodeSample = {
    title: 'my-preset/frame.ts',
    language: 'typescript',
    code: `// The card's frame: its corners, ring and shadow.
export const frame = 'rounded-2xl shadow-sm ring-1 ring-foreground/10';

// A small box's frame (scFrame size="sm": a row, an icon's box).
export const frameSm = 'rounded-md ring-1 ring-border';`,
  };

  protected readonly spread: ScCodeSample = {
    title: 'my-preset.ts',
    language: 'typescript',
    code: `import type { ScPreset } from '@semantic-components/presets';
import { nova } from '@semantic-components/presets/nova';

export const myPreset: ScPreset = {
  ...nova,
  frame: 'rounded-2xl shadow-sm ring-1 ring-foreground/10',
};`,
  };
}
