import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';

@Component({
  selector: 'app-select-on-programmatic-focus-page',
  imports: [TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Select On Programmatic Focus</h1>
        <p class="text-muted-foreground">
          A directive that automatically selects input text on programmatic
          focus.
        </p>
        <app-component-badges path="select-on-programmatic-focus" />
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>Usage</h2>
        <pre
          class="bg-muted rounded-md p-4 text-sm"
        ><code>{{ usageCode }}</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading toc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Uses
            <code>FocusMonitor</code>
            to detect the origin of focus events.
          </li>
          <li>
            When focus origin is
            <code>program</code>
            and the input has a non-empty value, calls
            <code>select()</code>
            to highlight all text.
          </li>
          <li>
            Ignores keyboard, mouse, and touch focus to avoid disrupting manual
            interaction.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectOnProgrammaticFocusPage {
  readonly usageCode = `import { ScSelectOnProgrammaticFocus } from '@semantic-components/ui';

@Component({
  imports: [ScSelectOnProgrammaticFocus],
  template: \`
    <input scSelectOnProgrammaticFocus value="Text to select" />
  \`,
})
export class MyComponent {}`;
}
