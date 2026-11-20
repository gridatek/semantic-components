import { NgTemplateOutlet } from '@angular/common';
import { Component, Injector, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ScStyleName } from '@semantic-components/styles';
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
  ScInput,
  ScLink,
  ScTypeset,
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
import { TocHeading } from '../../components/toc/toc-heading';
import { STYLES as STYLE_CLASSES } from '../../styles';

/** shadcn's words for each style (its changelog). */
const STYLES: { name: ScStyleName; description: string }[] = [
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
  selector: 'app-styles-page',
  imports: [
    NgTemplateOutlet,
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
    ScTypeset,
    ScInput,
    ScLink,
    SiCheckIcon,
    SiCopyIcon,
    TocHeading,
  ],
  template: `
    <!-- The same sample in every style: rendered with each style's injector. -->
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
        <h1 scTypeset>Styles</h1>
        <p class="text-muted-foreground text-lg text-balance">
          A style is the look of the components: shadcn/ui&apos;s eight styles,
          one entry point each. It holds every component&apos;s classes —
          corners, spacing, sizes, rings, shadows — and leaves the colors to
          your theme, so any style goes with any theme.
        </p>
        <div class="flex flex-wrap gap-2">
          <a scLink variant="button" size="sm" routerLink="/customize">
            Pick one for the whole site
          </a>
          <a
            scLink
            variant="outline"
            size="sm"
            routerLink="/docs/getting-started/custom-style"
          >
            Make your own
          </a>
        </div>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>The eight styles</h2>
        <p class="text-muted-foreground">
          The same card, field, badges and buttons in each. The app picks one
          when it starts; without one, the components use nova.
        </p>
        <div class="grid gap-4 md:grid-cols-2">
          @for (style of styles; track style.name) {
            <section
              scFrame
              class="flex flex-col gap-4 p-4"
              [attr.aria-labelledby]="'style-' + style.name"
            >
              <div class="space-y-1">
                <h3
                  [id]="'style-' + style.name"
                  class="font-semibold capitalize"
                >
                  {{ style.name }}
                </h3>
                <p class="text-muted-foreground text-sm">
                  {{ style.description }}
                </p>
                <code class="text-muted-foreground text-xs"
                  >&#64;semantic-components/styles/{{ style.name }}</code
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
        <h2 scTypeset appToc>Styles and themes</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong class="text-foreground">The style</strong> says how things
            are drawn: the classes of each component, written out in full as in
            shadcn/ui&apos;s generated code.
          </li>
          <li>
            <strong class="text-foreground">The theme</strong> says in which
            colors: the CSS variables in your
            <code scTypeset>styles.css</code>
            (<code scTypeset>--primary</code>,
            <code scTypeset>--radius</code>…), light and dark.
          </li>
          <li>
            A style is set when the app starts: switching one means reloading.
            To change only a few classes, spread a style and replace its keys —
            see
            <a scLink routerLink="/docs/getting-started/custom-style"
              >Custom style</a
            >.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>CSS files</h2>
        <p>
          Beside the eight styles, the package holds the CSS the components
          can&apos;t carry as classes. Those for a style come in two: the rules,
          the same in every style, and the style&apos;s variables.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>reduced-motion.css</code>
            — what the components need whatever the theme: with reduced motion
            asked for, animations keep their fades and lose their movement.
          </li>
          <li>
            <code scTypeset>typeset.css</code>
            and
            <code scTypeset>&lt;style&gt;/typeset-variables.css</code>
            — shadcn&apos;s typeset, for prose under
            <code scTypeset>scTypeset</code>.
          </li>
          <li>
            <code scTypeset>scrollbar.css</code>
            and
            <code scTypeset>&lt;style&gt;/scrollbar-variables.css</code>
            — every scrollbar of the page in the style&apos;s look.
          </li>
          <li>
            <code scTypeset>&lt;style&gt;/editor.css</code>
            — the Editor&apos;s document, if you use it.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class StylesPage {
  private readonly styles = STYLES;

  /** An injector per style: the parts in the sample read its style. */
  private readonly injectors = (() => {
    const parent = inject(Injector);
    const config = inject(SC_CONFIG);
    const injectors = {} as Record<ScStyleName, Injector>;
    for (const { name } of STYLES) {
      injectors[name] = Injector.create({
        parent,
        providers: [
          {
            provide: SC_CONFIG,
            useValue: { ...config, style: STYLE_CLASSES[name] },
          },
        ],
      });
    }
    return injectors;
  })();
}
