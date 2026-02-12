import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
  ScCopyButton,
} from '@semantic-components/ui-lab';
import BasicNumberFieldDemoContainer from './demos/basic-number-field-demo-container';
import ScrubbingNumberFieldDemoContainer from './demos/scrubbing-number-field-demo-container';
import PriceNumberFieldDemoContainer from './demos/price-number-field-demo-container';
import DisabledNumberFieldDemoContainer from './demos/disabled-number-field-demo-container';
import WithoutLabelNumberFieldDemoContainer from './demos/without-label-number-field-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-number-field-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyButton,
    BasicNumberFieldDemoContainer,
    ScrubbingNumberFieldDemoContainer,
    PriceNumberFieldDemoContainer,
    DisabledNumberFieldDemoContainer,
    WithoutLabelNumberFieldDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Number Field</h1>
        <p class="text-muted-foreground">
          A composable numeric input component with scrubbing support,
          increment/decrement buttons, and label integration.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>angular-ts</span>
            <button sc-copy-button [value]="usageCode"></button>
          </div>
          <div
            sc-code-viewer-content
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-number-field-demo-container />
        <app-scrubbing-number-field-demo-container />
        <app-price-number-field-demo-container />
        <app-disabled-number-field-demo-container />
        <app-without-label-number-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NumberFieldPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'number-field')!
    .status;
  readonly usageCode = `import {
  ScNumberField,
  ScNumberFieldScrubArea,
  ScNumberFieldInputGroup,
  ScNumberFieldDecrement,
  ScNumberFieldInput,
  ScNumberFieldIncrement,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  imports: [
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldInputGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    ScLabel,
    TocHeading,
  ],
  template: \`
    <div sc-number-field [(value)]="quantity" [min]="1" [max]="10">
      <div sc-number-field-scrub-area>
        <label sc-label>Quantity</label>
      </div>

      <div sc-number-field-group>
        <button sc-number-field-decrement></button>
        <input sc-number-field-input />
        <button sc-number-field-increment></button>
      </div>
    </div>
  \`,
})
export class MyComponent {
  readonly quantity = signal<number | null>(5);
}`;
}
