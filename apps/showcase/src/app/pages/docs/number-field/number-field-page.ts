import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
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
import { ScHeading } from '@semantic-components/ui';
import { SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicNumberFieldDemoContainer from './demos/basic-number-field-demo-container';
import DisabledNumberFieldDemoContainer from './demos/disabled-number-field-demo-container';
import PriceNumberFieldDemoContainer from './demos/price-number-field-demo-container';
import ScrubbingNumberFieldDemoContainer from './demos/scrubbing-number-field-demo-container';
import WithoutLabelNumberFieldDemoContainer from './demos/without-label-number-field-demo-container';

@Component({
  selector: 'app-number-field-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    CdkCopyToClipboard,
    SiCopyIcon,
    BasicNumberFieldDemoContainer,
    ScrubbingNumberFieldDemoContainer,
    PriceNumberFieldDemoContainer,
    DisabledNumberFieldDemoContainer,
    WithoutLabelNumberFieldDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Number Field</h1>
        <p class="text-muted-foreground">
          A composable numeric input component with scrubbing support,
          increment/decrement buttons, and label integration.
        </p>
        <app-component-badges path="number-field" />
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>Usage</h2>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button
              type="button"
              [cdkCopyToClipboard]="usageCode"
              class="hover:bg-accent hover:text-accent-foreground inline-flex size-9 items-center justify-center rounded-md"
              aria-label="Copy to clipboard"
            >
              <svg siCopyIcon class="size-4"></svg>
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
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
