import { Component, ViewEncapsulation } from '@angular/core';
import type { ScPresetName } from '@semantic-components/presets';
import { ScHeading, ScSeparator } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../components/toc/toc-heading';
import { PRESETS } from '../../presets';

@Component({
  selector: 'app-presets-page',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    TocHeading,
    SiCheckIcon,
    SiCopyIcon,
    ScSeparator,
    ScHeading,
    PackageManagerInstall,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Presets</h1>
        <p class="text-muted-foreground">
          The components' classes in shadcn/ui's styles, its presets:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/presets</code
          >, one entry point per style. The app picks one when it starts; the
          components use nova without one.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>The presets</h2>
        <p class="text-muted-foreground">
          The same button in each. To see the whole site in one, open the preset
          sheet (the palette button at the top).
        </p>
        <ul class="divide-y rounded-lg border">
          @for (name of names; track name) {
            <li class="flex flex-wrap items-center justify-between gap-4 p-4">
              <div class="grid gap-1">
                <span class="font-medium capitalize">{{ name }}</span>
                <code class="text-muted-foreground text-xs"
                  >&#64;semantic-components/presets/{{ name }}</code
                >
              </div>
              <span [class]="sample(name)">Button</span>
            </li>
          }
        </ul>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>1. Install the package</h2>
        <p class="text-muted-foreground">
          The ui library needs it (its peer): install them together.
        </p>
        <app-package-manager-install
          packages="@semantic-components/ui @semantic-components/presets"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Choose a preset</h2>
        <p class="text-muted-foreground">
          Give it to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >provideScConfig</code
          >
          when the app starts — for nova, nothing to do:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>app.config.ts</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="configCode" #copy1="scCodeBlockCopy">
                @if (copy1.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre
            scCodeBlockContent
            [code]="configCode"
            language="typescript"
          ></pre>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>3. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Tailwind skips
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >node_modules</code
          >: add your preset's file as a source in
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          — that one file only, so Tailwind scans one preset:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>styles.css</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="sourceCode" #copy2="scCodeBlockCopy">
                @if (copy2.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="sourceCode" language="css"></pre>
        </div>
        <p class="text-muted-foreground text-sm">
          The file is named after the preset (nova:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >…-presets-nova.mjs</code
          >). Adjust the path to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >node_modules</code
          >
          based on your project structure.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PresetsPage {
  protected readonly names = Object.keys(PRESETS) as ScPresetName[];

  readonly configCode = `import { lyra } from '@semantic-components/presets/lyra';
import { provideScConfig } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideScConfig({ preset: lyra })],
};`;

  readonly sourceCode =
    '@source "../node_modules/@semantic-components/presets/fesm2022/semantic-components-presets-lyra.mjs";';

  /** The preset's own button: how it looks. */
  protected sample(name: ScPresetName): string {
    return PRESETS[name].button({});
  }
}
