import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';

@Component({
  selector: 'app-button-pattern-page',
  imports: [TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Button Pattern</h1>
        <p class="text-muted-foreground">
          A directive that adds button behavior to non-button elements.
        </p>
        <app-component-badges path="button-pattern" />
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>Usage</h2>
        <pre
          class="bg-muted rounded-md p-4 text-sm"
        ><code>{{ usageCode }}</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading toc>What It Does</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Adds
            <code>role="button"</code>
            to the host element.
          </li>
          <li>
            Adds
            <code>tabindex="0"</code>
            for keyboard focusability.
          </li>
          <li>
            Handles
            <code>Enter</code>
            and
            <code>Space</code>
            key presses by triggering a click event.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPatternPage {
  readonly usageCode = `import { ScButtonPattern } from '@semantic-components/ui-lab';

@Component({
  imports: [ScButtonPattern],
  template: \`
    <div scButtonPattern (click)="doSomething()">Click me</div>
  \`,
})
export class MyComponent {
  doSomething() {}
}`;
}
