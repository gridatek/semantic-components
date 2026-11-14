import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCheckbox,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldTitle,
  ScLabel,
} from '@semantic-components/ui';

/** A label around a field: the whole card picks — bordered, tinted when checked, ringed when focused. */
@Component({
  selector: 'app-choice-card-label-demo',
  imports: [
    ScCheckbox,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldTitle,
    ScLabel,
  ],
  template: `
    <label scLabel class="w-full max-w-sm">
      <div scField orientation="horizontal">
        <div scFieldContentWrapper>
          <div scFieldTitle>Enable notifications</div>
          <p scFieldDescription>
            You can enable or disable notifications at any time.
          </p>
        </div>
        <div scField orientation="horizontal">
          <input scCheckbox />
        </div>
      </div>
    </label>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardLabelDemo {}
