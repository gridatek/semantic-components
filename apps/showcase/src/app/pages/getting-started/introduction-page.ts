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
  ScLink,
  ScTypeset,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiArrowRightIcon,
  SiCheckIcon,
  SiSparklesIcon,
} from '@semantic-icons/lucide-icons';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-introduction-page',
  imports: [
    DocCode,
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
    ScLink,
    ScTypeset,
    SiArrowRightIcon,
    SiCheckIcon,
    SiSparklesIcon,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <!-- Hero Header -->
      <div class="space-y-4">
        <div class="inline-flex items-center gap-2">
          <span
            scBadge
            variant="secondary"
            class="gap-1.5 px-3 py-1 text-xs font-medium"
          >
            <svg siSparklesIcon class="text-primary size-3.5"></svg>
            Built for Modern Angular
          </span>
        </div>
        <h1
          scTypeset
          class="text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          Introduction
        </h1>
        <p
          class="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance sm:text-xl"
        >
          An accessible, semi-headless UI library for Angular. Decoupling
          component logic from 8 shadcn-compatible styles—or your own custom
          style—with Tailwind CSS v4.
        </p>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a
            scLink
            variant="button"
            size="default"
            routerLink="/docs/getting-started"
          >
            Get started
            <svg siArrowRightIcon class="size-4"></svg>
          </a>
          <a scLink variant="outline" size="default" routerLink="/components">
            Browse components
          </a>
        </div>
      </div>

      <!-- Why Semantic Components -->
      <section class="space-y-5">
        <h2 scTypeset appToc>Why Semantic Components?</h2>
        <p class="text-muted-foreground leading-relaxed">
          Nowadays, building modern web applications in Angular often means
          choosing between two compromises:
        </p>

        <div class="grid gap-4 md:grid-cols-2">
          <div scCard class="h-full">
            <div scCardHeader>
              <h3 scCardTitle class="text-base font-semibold">
                1. Monolithic Component Kits
              </h3>
              <p scCardDescription>e.g. Traditional rigid UI libraries</p>
            </div>
            <div scCardBody class="text-muted-foreground space-y-2 text-sm">
              <p>
                Fast to install on day one, but painful on day thirty. You end
                up fighting encapsulated shadow DOMs, writing brittle
                <code>::ng-deep</code> overrides, and wrestling with components
                that accept 30 inputs just to position an icon.
              </p>
            </div>
          </div>

          <div scCard class="h-full">
            <div scCardHeader>
              <h3 scCardTitle class="text-base font-semibold">
                2. Copy-Pasting Source Code
              </h3>
              <p scCardDescription>e.g. Copy-paste UI approaches</p>
            </div>
            <div scCardBody class="text-muted-foreground space-y-2 text-sm">
              <p>
                You get complete ownership of the files, but your team is now
                permanently on the hook to resolve merge conflicts and sync
                changes manually whenever upstream updates a component, fixes a
                bug, or improves accessibility.
              </p>
            </div>
          </div>
        </div>

        <p class="leading-relaxed">
          <strong
            >Semantic Components gives you the best of both worlds.</strong
          >
          We divide the responsibility right down the middle:
          <strong>you own the template markup, HTML elements, and layout</strong
          >, while
          <strong
            >the library handles keyboard navigation, accessibility, focus
            trapping, and interchangeable styles (nova, vega, maia,
            etc.)</strong
          >. When a bug is fixed, a style is refined, or browser accessibility
          improves, you get the upgrade through a standard package bump without
          rewriting your templates.
        </p>
      </section>

      <!-- Semi-Headless Architecture -->
      <section class="space-y-5">
        <h2 scTypeset appToc>Decoupling component logic from visual styles</h2>
        <p class="leading-relaxed">
          What does <strong>semi-headless</strong> mean in Semantic Components?
        </p>
        <p class="text-muted-foreground leading-relaxed">
          Pure headless libraries give you unstyled primitives and leave you to
          figure out how to style them—whether through CSS modules, Sass, or
          custom utility classes. Tightly coupled libraries, on the other hand,
          hardcode CSS directly into their components.
        </p>
        <p class="text-muted-foreground leading-relaxed">
          Semantic Components takes a <strong>semi-headless</strong> approach:
          the component logic (<code scTypeset>@semantic-components/ui</code>)
          is decoupled from the visual look, but styling follows
          <strong>one unified contract</strong>: Tailwind CSS v4 and a typed
          style structure (<code scTypeset>@semantic-components/styles</code> or
          your own <code scTypeset>ScStyle</code>).
        </p>

        <div class="grid gap-4 md:grid-cols-2">
          <div scCard class="h-full">
            <div scCardHeader>
              <h3 scCardTitle class="text-base font-semibold">
                1. Component Logic (@semantic-components/ui)
              </h3>
              <p scCardDescription>Native directives & accessibility logic</p>
            </div>
            <div scCardBody class="text-muted-foreground space-y-2 text-sm">
              <p>
                Provides native attribute directives, WAI-ARIA accessibility,
                keyboard navigation, focus management, and signals. It queries
                visual classes dynamically via
                <code>injectStyle()</code> without locking you into any specific
                CSS.
              </p>
            </div>
          </div>

          <div scCard class="h-full">
            <div scCardHeader>
              <h3 scCardTitle class="text-base font-semibold">
                2. Visual Styles (@semantic-components/styles)
              </h3>
              <p scCardDescription>
                8 built-in styles or your own custom ScStyle
              </p>
            </div>
            <div scCardBody class="text-muted-foreground space-y-2 text-sm">
              <p>
                Provides 8 ready-to-use styles (<strong
                  >nova, vega, maia, lyra, mira, luma, sera, rhea</strong
                >).
              </p>
              <p>
                <strong>Bring your own design system:</strong> You aren't locked
                into our eight styles. A style is a plain TypeScript object
                matching the <code scTypeset>ScStyle</code> structure. You can
                build your own style from scratch or fork an existing one, and
                provide it via
                <code scTypeset
                  >provideSemanticComponents({{ '{' }} style: myCustomStyle
                  {{ '}' }})</code
                >.
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-3 pt-2">
          <h3 class="text-base font-semibold">
            Zero CSS Bloat with Tailwind CSS v4 &#64;source
          </h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            By choosing your style through Angular Dependency Injection and
            pairing it with Tailwind CSS v4's
            <code>&#64;source</code> directive, your build scans
            <strong>only the active style's entry point</strong>. You can switch
            styles anytime with zero dead CSS compiled into your bundle:
          </p>
          <div class="grid gap-4 lg:grid-cols-2">
            <div class="space-y-1.5">
              <div class="text-muted-foreground font-mono text-xs">
                app.config.ts
              </div>
              <app-doc-code [code]="providerCode" language="typescript" />
            </div>
            <div class="space-y-1.5">
              <div class="text-muted-foreground font-mono text-xs">
                styles.css
              </div>
              <app-doc-code [code]="sourceCssCode" language="css" />
            </div>
          </div>
        </div>
      </section>

      <!-- Semantic Naming -->
      <section class="space-y-4">
        <h2 scTypeset appToc>Semantic naming: Named for their role</h2>
        <p class="leading-relaxed">
          Every directive is named to describe its
          <strong>exact role</strong> in the interface, applied to the
          appropriate native HTML element.
        </p>
        <p class="text-muted-foreground leading-relaxed">
          In traditional libraries, a button might get a directive like
          <code>matTooltip="Save"</code>—even though the button isn't a tooltip,
          it's what triggers one. In Semantic Components:
        </p>
        <ul
          class="text-muted-foreground list-disc space-y-2 ps-6 leading-relaxed"
        >
          <li>
            The trigger is <code scTypeset>button[scTooltipTrigger]</code>,
            while the rendered bubble is <code scTypeset>div[scTooltip]</code>.
          </li>
          <li>
            The dialog opener is <code scTypeset>scDialogTrigger</code>, the
            panel is <code scTypeset>div[scDialog]</code>, its heading is
            <code scTypeset>h2[scDialogTitle]</code>, and its dismiss action is
            <code scTypeset>button[scDialogClose]</code>.
          </li>
        </ul>
        <p class="text-muted-foreground text-sm leading-relaxed">
          Because each directive clearly names what it does, you know how pieces
          connect before reading a line of documentation.
        </p>
      </section>

      <!-- Composable by Design -->
      <section class="space-y-5">
        <h2 scTypeset appToc>Composable by design</h2>
        <p class="leading-relaxed">
          Instead of monolithic blackboxes with dozens of inputs (<code
            scTypeset
            >[hasCloseButton]="true"</code
          >, <code scTypeset>[iconPosition]="'left'"</code>), Semantic
          Components is built from small, focused parts that you assemble in
          your template:
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
            class="bg-muted/40 flex items-center justify-center rounded-lg p-6"
            role="region"
            aria-label="Component preview"
          >
            <div scCard class="w-full max-w-xs shadow-sm">
              <div scCardHeader>
                <div class="flex items-center justify-between">
                  <h3 scCardTitle>Deploy Project</h3>
                  <span scBadge variant="secondary">Production</span>
                </div>
                <p scCardDescription>Ship your latest preview to production.</p>
              </div>
              <div scCardBody class="space-y-2">
                <div
                  class="text-muted-foreground flex items-center gap-2 text-sm"
                >
                  <svg siCheckIcon class="size-4 text-emerald-500"></svg>
                  All automated checks passed
                </div>
              </div>
              <div scCardFooter>
                <button scButton class="w-full">Deploy now</button>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-3 pt-2">
          <h3 class="text-base font-semibold">Multi-directive composition</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            Because parts are attribute directives on native elements, you can
            stack multiple behaviors on a single tag without wrapper divs:
          </p>
          <app-doc-code [code]="stackingCode" language="angular-html" />
          <p class="text-muted-foreground text-xs leading-relaxed">
            One native button element. Three responsibilities: styling (<code
              scTypeset
              >scButton</code
            >), opening a drawer (<code scTypeset>scDrawerTrigger</code>), and
            displaying a tooltip (<code scTypeset>scTooltipTrigger</code>).
          </p>
        </div>
      </section>
      <!-- Declarative State in Action -->
      <section class="space-y-4">
        <h2 scTypeset appToc>Declarative state in action</h2>
        <p class="leading-relaxed">
          Consider a dialog. Traditional Angular libraries force you into an
          imperative service pattern. In Semantic Components, your dialog
          structure, trigger, portal, and close actions live right inside your
          component's template:
        </p>
        <app-doc-code [code]="dialogCode" language="angular-html" />
        <p class="text-muted-foreground text-sm leading-relaxed">
          The dialog provider coordinates state through Angular's dependency
          injection tree. When <code>isOpen()</code> changes, entrance and exit
          animations run cleanly without manual teardown logic.
        </p>
      </section>

      <!-- Built for Modern Angular -->
      <section class="space-y-4">
        <h2 scTypeset appToc>Built for modern Angular</h2>
        <p class="leading-relaxed">
          Semantic Components is built from the ground up for modern Angular
          architectures—avoiding legacy paradigms entirely:
        </p>
        <ul
          class="text-muted-foreground list-disc space-y-2 ps-6 leading-relaxed"
        >
          <li>
            <strong class="text-foreground"
              >Signals & OnPush everywhere:</strong
            >
            Inputs, outputs, and models are all signal-first. Built to run
            zoneless with optimal change detection performance.
          </li>
          <li>
            <strong class="text-foreground">100% Standalone:</strong> Zero
            NgModules, zero <code>forRoot()</code> ceremonies. Just import the
            directives you need directly in your component.
          </li>
          <li>
            <strong class="text-foreground">Temporal for date & time:</strong>
            Built exclusively on the modern TC39 Temporal API (<code scTypeset
              >Temporal.PlainDate</code
            >, <code scTypeset>Temporal.PlainTime</code>). No legacy mutable
            JavaScript <code scTypeset>Date</code> quirks and no third-party
            date bloat.
          </li>
          <li>
            <strong class="text-foreground">Signal Forms ready:</strong> Native
            integration with Angular's next-generation form controls
            (<code>FormValueControl</code>) for type-safe validation and
            reactive values.
          </li>
          <li>
            <strong class="text-foreground"
              >Server-Side Rendering (SSR):</strong
            >
            Fully compatible with Angular SSR and hydration. Zero hydration
            mismatches (<code>NG05xx</code>), with browser-only APIs guarded
            safely.
          </li>
          <li>
            <strong class="text-foreground">Direction & Locale:</strong> Full
            support for RTL (Right-to-Left) reading orders and Angular's
            <code>LOCALE_ID</code> built into overlay positioning.
          </li>
        </ul>
      </section>

      <!-- Next Steps -->
      <section class="space-y-4">
        <h2 scTypeset appToc>Next steps</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          @for (step of nextSteps; track step.path) {
            <a
              [routerLink]="step.path"
              class="group bg-card hover:bg-muted/50 flex flex-col justify-between rounded-lg border p-4 transition-colors"
            >
              <div class="space-y-1">
                <div
                  class="text-foreground group-hover:text-primary flex items-center justify-between font-medium"
                >
                  {{ step.name }}
                  <svg
                    siArrowRightIcon
                    class="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                  ></svg>
                </div>
                <p class="text-muted-foreground text-sm">
                  {{ step.description }}
                </p>
              </div>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class IntroductionPage {
  readonly providerCode = `import { nova } from '@semantic-components/styles/nova';
import { provideSemanticComponents } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSemanticComponents({ style: nova }),
  ],
};`;

  readonly sourceCssCode = `/* In your styles.css — scans only your chosen style */
@source '../node_modules/@semantic-components/styles/fesm2022/semantic-components-styles-nova.mjs';`;

  readonly stackingCode = `<button scButton variant="outline" size="icon" scDrawerTrigger scTooltipTrigger="Open navigation">
  <svg siMenuIcon></svg>
</button>`;

  readonly example = [
    '<div scCard>',
    '  <div scCardHeader>',
    '    <h3 scCardTitle>Deploy Project</h3>',
    '    <p scCardDescription>Ship your latest preview to production.</p>',
    '  </div>',
    '  <div scCardBody>',
    '    <span scBadge variant="secondary">Production</span>',
    '  </div>',
    '  <div scCardFooter>',
    '    <button scButton class="w-full">Deploy now</button>',
    '  </div>',
    '</div>',
  ].join('\n');

  readonly dialogCode = `<div scDialogProvider [(open)]="isOpen">
  <button scButton scDialogTrigger variant="outline">Edit profile</button>

  <ng-template scDialogPortal>
    <div scDialog>
      <div scDialogHeader>
        <h2 scDialogTitle>Edit profile</h2>
        <p scDialogDescription>Make changes to your profile here.</p>
      </div>

      <!-- your form content and inputs -->

      <div scDialogFooter>
        <button scDialogClose variant="outline">Cancel</button>
        <button scButton type="submit">Save changes</button>
      </div>
    </div>
  </ng-template>
</div>`;

  readonly nextSteps = [
    {
      name: 'Get started',
      path: '/docs/getting-started',
      description:
        'Set up an Angular app with Tailwind CSS and the CDK in 5 minutes.',
    },
    {
      name: 'Custom styles',
      path: '/docs/getting-started/custom-style',
      description: 'Create your own brand style following our style structure.',
    },

    {
      name: 'Components',
      path: '/components',
      description:
        'Browse 140+ accessible components with live interactive examples.',
    },
    {
      name: 'Styles',
      path: '/docs/packages/styles',
      description:
        "Compare shadcn's eight styles (nova, vega, lyra...) side by side.",
    },
    {
      name: 'Theming guide',
      path: '/docs/guides/theming',
      description:
        'Customize color palettes, border radius, fonts, and dark mode.',
    },
  ];
}
