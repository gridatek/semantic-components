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
} from '@semantic-components/code';
import { ScCopyButton } from '@semantic-components/ui-lab';
import BasicNumberFieldDemoContainer from './demos/basic-number-field-demo-container';
import ScrubbingNumberFieldDemoContainer from './demos/scrubbing-number-field-demo-container';
import PriceNumberFieldDemoContainer from './demos/price-number-field-demo-container';
import DisabledNumberFieldDemoContainer from './demos/disabled-number-field-demo-container';
import WithoutLabelNumberFieldDemoContainer from './demos/without-label-number-field-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

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
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Number Field</h1>
        <p class="text-muted-foreground">
          A composable numeric input component with scrubbing support,
          increment/decrement buttons, and label integration.
        </p>
        <app-component-badges path="number-field" />
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button scCopyButton [value]="usageCode"></button>
          </div>
          <div
            scCodeViewerContent
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
    <div scNumberField [(value)]="quantity" [min]="1" [max]="10">
      <div scNumberFieldScrubArea>
        <label scLabel>Quantity</label>
      </div>

      <div scNumberFieldGroup>
        <button scNumberFieldDecrement></button>
        <input scNumberFieldInput />
        <button scNumberFieldIncrement></button>
      </div>
    </div>
  \`,
})
export class MyComponent {
  readonly quantity = signal<number | null>(5);
}`;
}
