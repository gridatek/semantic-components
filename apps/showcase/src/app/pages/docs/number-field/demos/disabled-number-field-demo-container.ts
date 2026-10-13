import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledNumberFieldDemo } from './disabled-number-field-demo';

@Component({
  selector: 'app-disabled-number-field-demo-container',
  imports: [DemoContainer, DisabledNumberFieldDemo],
  template: `
    <app-demo-container
      title="Disabled and read-only"
      demoUrl="/demos/number-field/disabled-number-field-demo"
      [code]="code"
    >
      <app-disabled-number-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export default class DisabledNumberFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNumberField,
  ScNumberFieldDecrement,
  ScNumberFieldGroup,
  ScNumberFieldIncrement,
  ScNumberFieldInput,
  ScNumberFieldScrubArea,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** Disabled: nothing changes it. Read-only: focusable and readable, not changed. */
@Component({
  selector: 'app-disabled-number-field-demo',
  imports: [
    ScField,
    ScLabel,
    ScNumberField,
    ScNumberFieldScrubArea,
    ScNumberFieldGroup,
    ScNumberFieldDecrement,
    ScNumberFieldInput,
    ScNumberFieldIncrement,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div class="flex flex-wrap gap-6">
      <div scField scNumberField class="w-40" [value]="42" [disabled]="true">
        <div scNumberFieldScrubArea>
          <label scLabel>Disabled</label>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease value</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase value</span>
          </button>
        </div>
      </div>
      <div scField scNumberField class="w-40" [value]="42" [readonly]="true">
        <div scNumberFieldScrubArea>
          <label scLabel>Read-only</label>
        </div>
        <div scNumberFieldGroup>
          <button scNumberFieldDecrement>
            <svg siMinusIcon></svg>
            <span class="sr-only">Decrease value</span>
          </button>
          <input scNumberFieldInput />
          <button scNumberFieldIncrement>
            <svg siPlusIcon></svg>
            <span class="sr-only">Increase value</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledNumberFieldDemo {}`;
}
