import { NgTemplateOutlet } from '@angular/common';
import { Component, Injector, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ScPresetName } from '@semantic-components/presets';
import {
  SC_CONFIG,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScFrame,
  ScHeading,
  ScInput,
  ScLink,
} from '@semantic-components/ui';
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

/** shadcn's words for each style (its changelog). */
const STYLES: { name: ScPresetName; description: string }[] = [
  {
    name: 'nova',
    description:
      'Reduced padding and margins for compact layouts. The default.',
  },
  { name: 'vega', description: 'The classic shadcn/ui look.' },
  { name: 'maia', description: 'Soft and rounded, with generous spacing.' },
  { name: 'lyra', description: 'Boxy and sharp. Pairs well with mono fonts.' },
  { name: 'mira', description: 'Compact. Made for dense interfaces.' },
  {
    name: 'luma',
    description: 'Rounded geometry. Soft elevation. Breathable layouts.',
  },
  {
    name: 'sera',
    description:
      'Minimal. Editorial. Typographic. Underline controls and uppercase headings.',
  },
  {
    name: 'rhea',
    description: 'A more compact Luma. Smaller spacing, denser surfaces.',
  },
];

@Component({
  selector: 'app-presets-page',
  imports: [
    NgTemplateOutlet,
    PackageManagerInstall,
    RouterLink,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScFrame,
    ScHeading,
    ScInput,
    ScLink,
    SiCheckIcon,
    SiCopyIcon,
    TocHeading,
  ],
  template: `
    <!-- The same sample in every style: rendered with each preset's injector. -->
    <ng-template #sample let-name>
      <div scCard class="w-full">
        <div scCardHeader>
          <h4 scCardTitle>Create project</h4>
          <p scCardDescription>Deploy a new project in one click.</p>
        </div>
        <div scCardBody class="flex flex-col gap-3">
          <input
            scInput
            [attr.aria-label]="'Project name, ' + name"
            placeholder="my-app"
          />
          <div class="flex items-center gap-2">
            <span scBadge variant="secondary">Preview</span>
            <span scBadge variant="outline">main</span>
          </div>
        </div>
        <div scCardFooter class="gap-2">
          <button scButton variant="outline" size="sm">Cancel</button>
          <button scButton size="sm" class="ms-auto">Deploy</button>
        </div>
      </div>
    </ng-template>

    <ng-template #code let-s>
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

    <div class="space-y-12">
      <div class="space-y-4">
        <h1 scHeading>Presets</h1>
        <p class="text-muted-foreground text-lg text-balance">
          A preset is the look of the components: shadcn/ui&apos;s eight styles,
          one entry point each. It holds every component&apos;s classes —
          corners, spacing, sizes, rings, shadows — and leaves the colors to
          your theme, so any preset goes with any theme.
        </p>
        <div class="flex flex-wrap gap-2">
          <a scLink variant="button" size="sm" routerLink="/presets">
            See them on real screens
          </a>
          <a
            scLink
            variant="outline"
            size="sm"
            routerLink="/docs/getting-started/custom-preset"
          >
            Make your own
          </a>
        </div>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>The eight styles</h2>
        <p class="text-muted-foreground">
          The same card, field, badges and buttons in each. The app picks one
          when it starts; without one, the components use nova.
        </p>
        <div class="grid gap-4 md:grid-cols-2">
          @for (style of styles; track style.name) {
            <section
              scFrame
              class="flex flex-col gap-4 p-4"
              [attr.aria-labelledby]="'preset-' + style.name"
            >
              <div class="space-y-1">
                <h3
                  [id]="'preset-' + style.name"
                  class="font-semibold capitalize"
                >
                  {{ style.name }}
                </h3>
                <p class="text-muted-foreground text-sm">
                  {{ style.description }}
                </p>
                <code class="text-muted-foreground text-xs"
                  >&#64;semantic-components/presets/{{ style.name }}</code
                >
              </div>
              <div class="bg-muted flex flex-1 items-center rounded-md p-4">
                <ng-container
                  [ngTemplateOutlet]="sample"
                  [ngTemplateOutletContext]="{ $implicit: style.name }"
                  [ngTemplateOutletInjector]="injectors[style.name]"
                />
              </div>
            </section>
          }
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Presets and themes</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            <strong class="text-foreground">The preset</strong> says how things
            are drawn: the classes of each component, written out in full as in
            shadcn/ui&apos;s generated code.
          </li>
          <li>
            <strong class="text-foreground">The theme</strong> says in which
            colors: the CSS variables in your
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >styles.css</code
            >
            (<code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >--primary</code
            >,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">--radius</code
            >…), light and dark.
          </li>
          <li>
            A preset is set when the app starts: switching one means reloading.
            To change only a few classes, spread a preset and replace its keys —
            see
            <a scLink routerLink="/docs/getting-started/custom-preset"
              >Custom preset</a
            >.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Setup</h2>
        <h3 class="text-lg font-medium tracking-tight">
          1. Install the package
        </h3>
        <p class="text-muted-foreground">
          The ui library needs it (its peer): install them together.
        </p>
        <app-package-manager-install
          packages="@semantic-components/ui @semantic-components/presets"
        />

        <h3 class="pt-4 text-lg font-medium tracking-tight">
          2. Choose a preset
        </h3>
        <p class="text-muted-foreground">
          Give it to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >provideSemanticComponents</code
          >
          when the app starts — for nova, nothing to do:
        </p>
        <ng-container
          [ngTemplateOutlet]="code"
          [ngTemplateOutletContext]="{ $implicit: config }"
        />

        <h3 class="pt-4 text-lg font-medium tracking-tight">
          3. Add its file to Tailwind
        </h3>
        <p class="text-muted-foreground">
          Tailwind skips
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >node_modules</code
          >: add your preset&apos;s file as a source in
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          — that one file only, so Tailwind scans one preset. It is named after
          the preset (nova:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >…-presets-nova.mjs</code
          >); adjust the path to your project.
        </p>
        <ng-container
          [ngTemplateOutlet]="code"
          [ngTemplateOutletContext]="{ $implicit: source }"
        />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PresetsPage {
  protected readonly styles = STYLES;

  /** An injector per style: the parts in the sample read its preset. */
  protected readonly injectors = (() => {
    const parent = inject(Injector);
    const config = inject(SC_CONFIG);
    const injectors = {} as Record<ScPresetName, Injector>;
    for (const { name } of STYLES) {
      injectors[name] = Injector.create({
        parent,
        providers: [
          {
            provide: SC_CONFIG,
            useValue: { ...config, preset: PRESETS[name] },
          },
        ],
      });
    }
    return injectors;
  })();

  protected readonly config = {
    title: 'app.config.ts',
    language: 'typescript',
    code: `import { lyra } from '@semantic-components/presets/lyra';
import { provideSemanticComponents } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideSemanticComponents({ preset: lyra })],
};`,
  };

  protected readonly source = {
    title: 'styles.css',
    language: 'css',
    code: '@source "../node_modules/@semantic-components/presets/fesm2022/semantic-components-presets-lyra.mjs";',
  };
}
