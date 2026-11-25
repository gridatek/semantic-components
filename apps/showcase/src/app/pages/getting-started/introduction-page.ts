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
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-4">
        <h1 scTypeset>Introduction</h1>
        <p class="text-muted-foreground text-lg text-balance">
          An accessible, semi-headless UI library for Angular: the component
          logic decoupled from its look — shadcn/ui&apos;s eight styles, or your
          own — with Tailwind CSS.
        </p>
        <div class="flex flex-wrap gap-2">
          <a
            scLink
            variant="button"
            size="sm"
            routerLink="/docs/getting-started"
          >
            Get started
          </a>
          <a scLink variant="outline" size="sm" routerLink="/components">
            Browse components
          </a>
        </div>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Why Semantic Components?</h2>
        <p>
          Building a modern web application in Angular often means choosing
          between two compromises:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong>Monolithic component kits.</strong> Fast to install on day
            one, painful on day thirty: you end up fighting encapsulated styles,
            writing brittle <code scTypeset>::ng-deep</code> overrides, and
            wrestling with components that take thirty inputs just to position
            an icon.
          </li>
          <li>
            <strong>Copying the source code.</strong> You own the files
            completely — and your team is on the hook for keeping them in sync
            by hand whenever upstream updates a component, fixes a bug or
            improves its accessibility.
          </li>
        </ul>
        <p>
          <strong>Semantic Components gives you the best of both.</strong> It
          divides the responsibility down the middle:
          <strong>you own the markup, the elements and the layout</strong>;
          <strong
            >the library handles keyboard navigation, accessibility, focus and
            the interchangeable styles (nova, vega, maia…)</strong
          >. When a bug is fixed, a style refined or accessibility improved, you
          get it with a package update — without rewriting your templates.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Decoupling component logic from visual styles</h2>
        <p>
          What does <strong>semi-headless</strong> mean here? Headless libraries
          give you unstyled primitives and leave the styling to you — CSS
          modules, Sass or your own utility classes. Tightly coupled libraries
          hard-code their CSS into their components.
        </p>
        <p>
          Semantic Components takes the middle way: the component logic is
          decoupled from the look, but styling follows
          <strong>one contract</strong> — Tailwind CSS and a typed style
          structure. Two packages:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong>The logic</strong>
            (<code scTypeset>&#64;semantic-components/ui</code>): attribute
            directives on native elements, WAI-ARIA accessibility, keyboard
            navigation, focus management and signals. Each part reads its
            classes from the style with <code scTypeset>injectStyle()</code>,
            without tying you to any CSS.
          </li>
          <li>
            <strong>The look</strong>
            (<code scTypeset>&#64;semantic-components/styles</code>):
            shadcn/ui&apos;s eight styles, ready to use — nova, vega, maia,
            lyra, mira, luma, sera and rhea.
          </li>
          <li>
            <strong>Or your own design system.</strong> A style is a plain
            TypeScript object of the <code scTypeset>ScStyle</code> structure:
            build one from scratch, or start from one of the eight, and provide
            it with
            <code scTypeset
              >provideSemanticComponents(&#123; preset: &#123; style: myStyle
              &#125; &#125;)</code
            >.
          </li>
        </ul>

        <h3 scTypeset>Only your style&apos;s CSS</h3>
        <p>
          You choose the style through Angular&apos;s dependency injection, and
          Tailwind&apos;s <code scTypeset>&#64;source</code> scans the library
          and that style&apos;s entry point only — no other style&apos;s classes
          in your CSS. Switching styles is a two-line change:
        </p>
        <app-doc-code [code]="providerCode" language="typescript" />
        <app-doc-code [code]="sourceCssCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Named for their role</h2>
        <p>
          Every directive is named for its <strong>exact role</strong> in the
          interface, on the native element that has that role. Elsewhere, a
          button might get <code scTypeset>matTooltip="Save"</code> — though the
          button isn&apos;t a tooltip, it opens one. Here:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The button is <code scTypeset>button[scTooltipTrigger]</code>; the
            bubble it shows is <code scTypeset>div[scTooltip]</code>.
          </li>
          <li>
            The dialog opener is <code scTypeset>scDialogTrigger</code>, the
            panel <code scTypeset>div[scDialog]</code>, its heading
            <code scTypeset>h2[scDialogTitle]</code>, and its dismiss action
            <code scTypeset>button[scDialogClose]</code>.
          </li>
        </ul>
        <p>
          Because each directive says what it does, you know how the pieces fit
          before reading a line of documentation.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Composable by design</h2>
        <p>
          Instead of monolithic black boxes with dozens of inputs (<code
            scTypeset
            >[hasCloseButton]="true"</code
          >, <code scTypeset>[iconPosition]="'left'"</code>), a component is
          small, focused parts that you assemble in your template:
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
                <h3 scCardTitle>Deploy project</h3>
                <p scCardDescription>Ship your latest preview to production.</p>
              </div>
              <div scCardBody>
                <span scBadge variant="secondary">Production</span>
              </div>
              <div scCardFooter>
                <button scButton class="w-full">Deploy now</button>
              </div>
            </div>
          </div>
        </div>

        <h3 scTypeset>Several parts on one element</h3>
        <p>
          Parts are attribute directives on native elements, so one element can
          take several — no wrapper elements:
        </p>
        <app-doc-code [code]="stackingCode" language="angular-html" />
        <p>
          One native button, three responsibilities: its look (<code scTypeset
            >scButton</code
          >), opening a drawer (<code scTypeset>scDrawerTrigger</code>) and
          showing a tooltip (<code scTypeset>scTooltipTrigger</code>).
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Declarative state</h2>
        <p>
          Take a dialog. Many Angular libraries open one from a service, in
          code. Here, the dialog — its trigger, its content and its close button
          — lives in your component&apos;s template:
        </p>
        <app-doc-code [code]="dialogCode" language="angular-html" />
        <p>
          The dialog&apos;s provider shares its state with its parts through
          Angular&apos;s dependency injection. Its
          <code scTypeset>open</code> state is a binding: when
          <code scTypeset>isOpen()</code> changes, the dialog opens or closes,
          with its animations, and nothing to tear down by hand.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Built for modern Angular</h2>
        <p>
          Built from the ground up for today&apos;s Angular, without the older
          ways:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong>Signals and OnPush.</strong> Inputs, outputs and models are
            signals; it runs zoneless.
          </li>
          <li>
            <strong>Standalone only.</strong> No NgModules, no
            <code scTypeset>forRoot()</code>: import the directives you use in
            your component.
          </li>
          <li>
            <strong>Temporal for dates and times.</strong> Built on the TC39
            Temporal API (<code scTypeset>Temporal.PlainDate</code>,
            <code scTypeset>Temporal.PlainTime</code>): no mutable JavaScript
            <code scTypeset>Date</code>, and no third-party date library.
          </li>
          <li>
            <strong>Signal Forms.</strong> Every control is a Signal Forms
            control (<code scTypeset>FormValueControl</code>): typed values and
            validation from the field you bind.
          </li>
          <li>
            <strong>Server-side rendering.</strong> Rendered on the server and
            hydrated without a mismatch; browser-only APIs are guarded.
          </li>
          <li>
            <strong>Direction and locale.</strong> Right to left built in, from
            Angular&apos;s <code scTypeset>Directionality</code> and
            <code scTypeset>LOCALE_ID</code> — not inputs on each part.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Next steps</h2>
        <ul class="list-disc space-y-2 ps-6">
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
  private readonly providerCode = `// app.config.ts
import { nova } from '@semantic-components/styles/nova';
import { provideSemanticComponents } from '@semantic-components/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideSemanticComponents({ preset: { style: nova } })],
};`;

  private readonly sourceCssCode = `/* styles.css: the library, and your style's file only */
@source '../node_modules/@semantic-components/ui';
@source '../node_modules/@semantic-components/styles/fesm2022/semantic-components-styles-nova.mjs';`;

  private readonly stackingCode = `<div scDrawerProvider>
  <div scTooltipProvider>
    <button scButton variant="outline" size="icon" scDrawerTrigger scTooltipTrigger>
      <svg siMenuIcon></svg>
      <span class="sr-only">Open navigation</span>
    </button>
    <ng-template scTooltipPortal>
      <div scTooltip>Open navigation</div>
    </ng-template>
  </div>
  <!-- the drawer -->
</div>`;

  private readonly example = [
    '<div scCard>',
    '  <div scCardHeader>',
    '    <h3 scCardTitle>Deploy project</h3>',
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

  private readonly dialogCode = `<div scDialogProvider [(open)]="isOpen">
  <button scButton variant="outline" scDialogTrigger>Edit profile</button>

  <ng-template scDialogPortal>
    <div scDialog>
      <div scDialogHeader>
        <h2 scDialogTitle>Edit profile</h2>
        <p scDialogDescription>Make changes to your profile here.</p>
      </div>

      <!-- your form -->

      <div scDialogFooter>
        <button scDialogClose variant="outline" size="default">Cancel</button>
        <button scButton type="submit">Save changes</button>
      </div>
    </div>
  </ng-template>
</div>`;

  private readonly nextSteps = [
    {
      name: 'Get started',
      path: '/docs/getting-started',
      description: 'set up an Angular app with Tailwind CSS and the CDK.',
    },
    {
      name: 'Custom styles',
      path: '/docs/getting-started/custom-style',
      description: 'create your own brand style, in the style structure.',
    },
    {
      name: 'Components',
      path: '/components',
      description: '140+ accessible components, with live examples.',
    },
    {
      name: 'Styles',
      path: '/docs/packages/styles',
      description: "shadcn's eight styles (nova, vega, lyra…) side by side.",
    },
    {
      name: 'Theming guide',
      path: '/docs/guides/theming',
      description: 'colour palettes, radius, fonts and dark mode.',
    },
  ];
}
