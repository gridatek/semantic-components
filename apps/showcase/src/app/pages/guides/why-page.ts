import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-why-page',
  imports: [DocCode, ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Why Semantic Components</h1>
        <p class="text-muted-foreground">
          shadcn/ui, Radix and Base UI raised the bar for what a component
          library can be. Semantic Components brings that standard to Angular,
          leaning fully into what makes modern Angular good: signals,
          standalone, Signal Forms, the CDK.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Semantic</h2>
        <p>
          Each part is named for its role, not its feature: the button that
          opens a tooltip is a trigger, the bubble is the tooltip. And each goes
          on the right native element — a dialog&apos;s title on a heading, a
          breadcrumb in a list, a toggle on a button — rather than a generic
          div.
        </p>
        <app-doc-code [code]="semanticCode" language="angular-html" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Declarative</h2>
        <p>
          The whole interface is in the template: no service to call to open a
          dialog, no imperative create(). State is a two-way binding (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >[(open)]</code
          >,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">[(value)]</code>)
          or a Signal Forms field.
        </p>
        <app-doc-code [code]="dialogCode" language="angular-html" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Composable</h2>
        <p>
          A component is its parts, each a directive on your element: you write
          the markup — and every word of it — in the order and layout you want,
          add what you need, leave out what you don&apos;t. Parts stack on one
          element: a button can be a dialog&apos;s trigger and a toolbar&apos;s
          widget at once.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>shadcn&apos;s look, in eight styles</h2>
        <p>
          The classes follow shadcn/ui in all eight of its styles, chosen when
          the app starts; the colours are your theme&apos;s CSS variables.
          Tailwind CSS and class-variance-authority for the variants; your class
          always merges over the style&apos;s.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Modern Angular only</h2>
        <p>
          Deliberate choices, for the Angular to come rather than the one before
          — so it isn&apos;t for every project:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Zoneless and OnPush, signals throughout (input(), model(),
            computed()).
          </li>
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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class WhyPage {
  private readonly semanticCode = `<!-- The trigger is the button; the tooltip is what it shows. -->
<div scTooltipProvider>
  <button scButton scTooltipTrigger>Save</button>
  <ng-template scTooltipPortal>
    <div scTooltip>Save changes</div>
  </ng-template>
</div>`;

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
}
