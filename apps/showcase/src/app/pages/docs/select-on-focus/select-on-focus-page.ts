import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';

@Component({
  selector: 'app-select-on-focus-page',
  imports: [TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Select On Focus</h1>
        <p class="text-muted-foreground">
          A directive that automatically selects input text on focus.
          Configurable to respond to specific focus origins.
        </p>
        <app-component-badges path="select-on-focus" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <pre
          class="bg-muted rounded-md p-4 text-sm"
        ><code>{{ usageCode }}</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Custom Origins</h2>
        <pre
          class="bg-muted rounded-md p-4 text-sm"
        ><code>{{ customOriginsCode }}</code></pre>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Uses
            <code>FocusMonitor</code>
            to detect the origin of focus events.
          </li>
          <li>
            When the focus origin matches one of the configured origins and the
            input has a non-empty value, calls
            <code>select()</code>
            to highlight all text.
          </li>
          <li>
            By default, responds to all focus origins (
            <code>program</code>
            ,
            <code>keyboard</code>
            ,
            <code>mouse</code>
            ,
            <code>touch</code>
            ).
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectOnFocusPage {
  readonly usageCode = `import { ScSelectOnFocus } from '@semantic-components/ui';

@Component({
  imports: [ScSelectOnFocus],
  template: \`
    <input scSelectOnFocus value="Text to select" />
  \`,
})
export class MyComponent {}`;

  readonly customOriginsCode = `<!-- Select only on programmatic focus -->
<input [scSelectOnFocus]="['program']" value="Select me" />

<!-- Select on keyboard and programmatic focus -->
<input [scSelectOnFocus]="['program', 'keyboard']" value="Select me" />`;
}
