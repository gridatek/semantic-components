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
          Semantic Components is a UI library for modern Angular: the look of
          shadcn/ui, in all eight of its styles, made of parts you put on your
          own elements.
        </p>
        <div class="flex flex-wrap gap-2">
          <a
            scLink
            variant="button"
            size="sm"
            routerLink="/docs/getting-started/installation"
          >
            Get started
          </a>
          <a scLink variant="outline" size="sm" routerLink="/components">
            Browse components
          </a>
        </div>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>The big idea</h2>
        <p>
          A component library usually makes you choose. A component that draws
          everything itself is quick to start with, but its markup, its words
          and its layout are its own, and you fight it as soon as you need
          something else. Copying a component&apos;s source into your app, as
          shadcn/ui does, gives you all of it — and leaves you to maintain the
          copy.
        </p>
        <p>
          Semantic Components splits the work in two. A component is a set of
          parts, and each part is a directive on an element you write.
          <strong
            >The markup, the words and the icons are yours; the behaviour, the
            accessibility and the look are the library&apos;s</strong
          >
          — and they improve each time you update the package.
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
        <h2 scTypeset appToc>What is yours</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong>The markup.</strong> You choose the elements, their order
            and the layout around them; leave out a part you don&apos;t need,
            put your own markup between two.
          </li>
          <li>
            <strong>The words.</strong> No part writes text: every label, button
            name and message is in your template, in your language — so
            translating is yours, with Angular&apos;s tools.
          </li>
          <li>
            <strong>The icons.</strong> A part holds your
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">svg</code>
            and sizes it; swap Lucide for any set.
          </li>
          <li>
            <strong>The theme.</strong> Colours, radius and fonts are your CSS
            variables — shadcn&apos;s names, so its themes carry over.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>What is the library&apos;s</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong>Behaviour.</strong> Opening and closing, positioning,
            keyboard, focus, typeahead — on Angular Aria and the CDK.
          </li>
          <li>
            <strong>Accessibility.</strong> Roles, states and names wired
            between the parts, to WCAG AA; every page checked with axe, in light
            and dark.
          </li>
          <li>
            <strong>The look.</strong> Each part&apos;s classes in the style
            your app chose — one of shadcn/ui&apos;s eight. Your class merges
            over them.
          </li>
          <li>
            <strong>Forms.</strong> Every control is a Signal Forms control: its
            value, its errors and its state come from the field you bind.
          </li>
          <li>
            <strong>Direction and the server.</strong> Right to left built in;
            rendered on the server and hydrated without a mismatch.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Named for their role</h2>
        <p>
          Each part says what it is in the interface: the button that opens a
          dialog is its trigger, the heading in it is its title. And each goes
          on the native element that has that role — a title on a heading, a
          trigger on a button — so the page keeps what the browser gives it.
          Parts stack: one button can be a dialog&apos;s trigger and a
          toolbar&apos;s widget at once. The template describes the page, and
          state is a binding:
        </p>
        <app-doc-code [code]="dialogCode" language="angular-html" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Modern Angular only</h2>
        <p>
          Deliberate choices, for the Angular to come rather than the one before
          — so it isn&apos;t for every project:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>Zoneless and OnPush, signals throughout.</li>
          <li>Standalone only: no NgModules, no forRoot().</li>
          <li>Signal Forms only: no ngModel, no reactive forms.</li>
          <li>
            Attribute selectors only (button[scButton]): no custom elements, no
            wrappers.
          </li>
          <li>
            Direction and language from Angular (Directionality, LOCALE_ID), not
            inputs on each part.
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
  private readonly example = [
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

  private readonly dialogCode = `<div scDialogProvider [(open)]="editing">
  <button scButton scDialogTrigger variant="outline">Edit profile</button>
  <ng-template scDialogPortal>
    <div scDialog>
      <h2 scDialogTitle>Edit profile</h2>
      <p scDialogDescription>Make changes to your profile here.</p>
      …
    </div>
  </ng-template>
</div>`;

  private readonly nextSteps = [
    {
      name: 'Installation',
      path: '/docs/getting-started/installation',
      description: 'set up an Angular app for the components.',
    },
    {
      name: 'Components',
      path: '/docs/components',
      description: 'every component, with its examples and API.',
    },
    {
      name: 'Styles',
      path: '/docs/packages/styles',
      description: 'the eight looks, side by side.',
    },
    {
      name: 'Theming',
      path: '/docs/guides/theming',
      description: 'your colours, dark mode, colour schemes.',
    },
  ];
}
