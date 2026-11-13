import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
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
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
  ScLink,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiAccessibilityIcon,
  SiArrowRightLeftIcon,
  SiBlocksIcon,
  SiBotIcon,
  SiChartColumnIcon,
  SiCodeIcon,
  SiLayersIcon,
  SiPackageIcon,
  SiPaletteIcon,
  SiPuzzleIcon,
  SiSparklesIcon,
  SiZapIcon,
} from '@semantic-icons/lucide-icons';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-introduction-page',
  imports: [
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
    ScCodeBlockContent,
    ScFrame,
    ScHeading,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    ScLink,
    SiAccessibilityIcon,
    SiArrowRightLeftIcon,
    SiBlocksIcon,
    SiBotIcon,
    SiChartColumnIcon,
    SiCodeIcon,
    SiLayersIcon,
    SiPackageIcon,
    SiPaletteIcon,
    SiPuzzleIcon,
    SiSparklesIcon,
    SiZapIcon,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-4">
        <h1 scHeading>Introduction</h1>
        <p class="text-muted-foreground text-lg text-balance">
          The missing piece in the Angular world: beautifully crafted UI
          components for modern Angular, built with Tailwind CSS on Angular Aria
          and the Angular CDK — in the look of shadcn/ui, in all eight of its
          styles.
        </p>
        <div class="flex flex-wrap gap-2">
          <a
            scLink
            variant="button"
            size="sm"
            routerLink="/docs/getting-started/prerequisites"
          >
            Get started
          </a>
          <a scLink variant="outline" size="sm" routerLink="/components">
            Browse components
          </a>
        </div>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>A part on your element</h2>
        <p class="text-muted-foreground">
          Every part is a directive on an element you write: the markup, the
          text and the icons stay yours, and the part brings the behaviour, the
          accessibility and the look of your preset.
        </p>
        <div class="grid gap-4 lg:grid-cols-2">
          <div scCodeBlock class="min-w-0">
            <pre
              scCodeBlockContent
              language="angular-html"
              [code]="example"
            ></pre>
          </div>
          <div
            scFrame
            class="bg-muted flex items-center justify-center p-6"
            role="region"
            aria-label="Result"
          >
            <div scCard class="w-full max-w-xs">
              <div scCardHeader>
                <h3 scCardTitle>Deploy</h3>
                <p scCardDescription>Ship the preview to production.</p>
              </div>
              <div scCardBody>
                <span scBadge variant="secondary">Ready</span>
              </div>
              <div scCardFooter>
                <button scButton class="w-full">Deploy now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Features</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          @for (feature of features; track feature.title) {
            <div scItem variant="outline" class="items-start">
              <div scItemMedia variant="icon">
                @switch (feature.icon) {
                  @case ('puzzle') {
                    <svg siPuzzleIcon></svg>
                  }
                  @case ('accessibility') {
                    <svg siAccessibilityIcon></svg>
                  }
                  @case ('palette') {
                    <svg siPaletteIcon></svg>
                  }
                  @case ('rtl') {
                    <svg siArrowRightLeftIcon></svg>
                  }
                  @case ('zap') {
                    <svg siZapIcon></svg>
                  }
                  @case ('code') {
                    <svg siCodeIcon></svg>
                  }
                  @case ('layers') {
                    <svg siLayersIcon></svg>
                  }
                  @default {
                    <svg siPackageIcon></svg>
                  }
                }
              </div>
              <div scItemBody>
                <div scItemTitle>{{ feature.title }}</div>
                <p scItemDescription class="line-clamp-none">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          }
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Explore</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          <a
            scItem
            variant="outline"
            class="items-start"
            routerLink="/components"
          >
            <div scItemMedia variant="icon"><svg siBlocksIcon></svg></div>
            <div scItemBody>
              <div scItemTitle>Components</div>
              <p scItemDescription class="line-clamp-none">
                Every component, by category, each with its examples and API.
              </p>
            </div>
          </a>
          <a
            scItem
            variant="outline"
            class="items-start"
            routerLink="/ai-elements"
          >
            <div scItemMedia variant="icon"><svg siSparklesIcon></svg></div>
            <div scItemBody>
              <div scItemTitle>AI Elements</div>
              <p scItemDescription class="line-clamp-none">
                Patterns for agentic interfaces: chat, reasoning, tool calls,
                plans.
              </p>
            </div>
          </a>
          <a scItem variant="outline" class="items-start" routerLink="/presets">
            <div scItemMedia variant="icon"><svg siPaletteIcon></svg></div>
            <div scItemBody>
              <div scItemTitle>Presets</div>
              <p scItemDescription class="line-clamp-none">
                The eight styles side by side, on real screens.
              </p>
            </div>
          </a>
          <a scItem variant="outline" class="items-start" routerLink="/charts">
            <div scItemMedia variant="icon"><svg siChartColumnIcon></svg></div>
            <div scItemBody>
              <div scItemTitle>
                Charts <span scBadge variant="secondary">Coming soon</span>
              </div>
              <p scItemDescription class="line-clamp-none">
                Area, bar, line, pie, radar and radial charts to copy.
              </p>
            </div>
          </a>
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Packages</h2>
        <div class="grid gap-3">
          @for (pkg of packages; track pkg.name) {
            <div scItem variant="outline" class="items-start">
              <div scItemMedia variant="icon">
                @if (pkg.name.endsWith('mcp-server')) {
                  <svg siBotIcon></svg>
                } @else if (pkg.name.endsWith('presets')) {
                  <svg siPaletteIcon></svg>
                } @else {
                  <svg siPackageIcon></svg>
                }
              </div>
              <div scItemBody>
                <div scItemTitle class="font-mono">{{ pkg.name }}</div>
                <p scItemDescription class="line-clamp-none">
                  {{ pkg.description }}
                </p>
              </div>
            </div>
          }
        </div>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Next steps</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          @for (step of nextSteps; track step.path) {
            <li>
              <a scLink [routerLink]="step.path">{{ step.name }}</a>
              — {{ step.description }}
            </li>
          }
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class IntroductionPage {
  protected readonly example = [
    '<div scCard>',
    '  <div scCardHeader>',
    '    <h3 scCardTitle>Deploy</h3>',
    '    <p scCardDescription>Ship the preview to production.</p>',
    '  </div>',
    '  <div scCardBody>',
    '    <span scBadge variant="secondary">Ready</span>',
    '  </div>',
    '  <div scCardFooter>',
    '    <button scButton class="w-full">Deploy now</button>',
    '  </div>',
    '</div>',
  ].join('\n');

  protected readonly features = [
    {
      icon: 'puzzle',
      title: 'Semantic and composable',
      description:
        'Small parts with meaningful names, directives on your own elements: templates that read like documentation.',
    },
    {
      icon: 'accessibility',
      title: 'Accessible',
      description:
        'Built on Angular Aria: roles, keyboard and focus handled; every page checked with axe, to WCAG AA.',
    },
    {
      icon: 'palette',
      title: 'Eight styles',
      description:
        "shadcn/ui's eight styles as presets, chosen when the app starts — or one of your own.",
    },
    {
      icon: 'rtl',
      title: 'Right to left',
      description:
        'Logical sides and alignments that flip with the direction, for one direction or mixed.',
    },
    {
      icon: 'zap',
      title: 'Modern Angular',
      description:
        'Signals, standalone parts, control flow, and Signal Forms for every form control.',
    },
    {
      icon: 'code',
      title: 'Type safe',
      description:
        'Strict TypeScript, typed inputs and preset types, with autocompletion out of the box.',
    },
    {
      icon: 'layers',
      title: 'Tailwind CSS',
      description:
        'Styled with Tailwind CSS: the preset gives the look, your class merges over it.',
    },
    {
      icon: 'package',
      title: 'Tree-shakable',
      description:
        'Heavy parts live in their own entry points, so only what you use reaches your bundle.',
    },
  ];

  protected readonly packages = [
    {
      name: '@semantic-components/ui',
      description:
        'The components, with entry points for the ones that need a library: carousel (Embla), data table (TanStack Table), PDF viewer (PDF.js), phone input (libphonenumber-js), QR code (uqr), animated counter (Motion), confetti, rich text editor (Tiptap), charts (d3), code block (Shiki), diff viewer (jsdiff), code editor (CodeMirror), languages (Angular localize).',
    },
    {
      name: '@semantic-components/presets',
      description:
        "The components' looks, one per shadcn/ui style — Nova by default, Lyra, Vega, Maia, Mira, Luma, Sera, Rhea — chosen when the app starts.",
    },
    {
      name: '@semantic-components/mcp-server',
      description: 'An MCP server for AI coding assistants.',
    },
  ];

  protected readonly nextSteps = [
    {
      name: 'Prerequisites',
      path: '/docs/getting-started/prerequisites',
      description: 'Angular Aria, the CDK and Tailwind CSS.',
    },
    {
      name: 'UI',
      path: '/docs/getting-started/ui',
      description: 'install the components and set up the app.',
    },
    {
      name: 'Presets',
      path: '/docs/getting-started/presets',
      description: 'choose one of the eight styles.',
    },
    {
      name: 'Internationalization',
      path: '/docs/getting-started/i18n',
      description: 'one build for all languages using Angular localize.',
    },
    {
      name: 'Right to left',
      path: '/docs/getting-started/rtl',
      description: 'one direction, or mixed.',
    },
  ];
}
