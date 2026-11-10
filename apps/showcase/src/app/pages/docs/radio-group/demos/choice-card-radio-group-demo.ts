import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldTitle,
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** Choices as cards: a label around each field — the whole card picks. */
@Component({
  selector: 'app-choice-card-radio-group-demo',
  imports: [
    FormField,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldTitle,
    ScLabel,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: `
    <div
      scRadioGroup
      [formField]="planForm.plan"
      aria-label="Plan"
      class="w-full max-w-sm"
    >
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Plus</div>
            <p scFieldDescription>For individuals and small teams.</p>
          </div>
          <div scRadioField>
            <input scRadio value="plus" />
          </div>
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Pro</div>
            <p scFieldDescription>For growing businesses.</p>
          </div>
          <div scRadioField>
            <input scRadio value="pro" />
          </div>
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldBody>
            <div scFieldTitle>Enterprise</div>
            <p scFieldDescription>For large teams and enterprises.</p>
          </div>
          <div scRadioField>
            <input scRadio value="enterprise" />
          </div>
        </div>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardRadioGroupDemo {
  protected readonly planForm = form(signal({ plan: 'plus' }));
}
