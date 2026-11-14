import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScLabel,
  ScSwitch,
} from '@semantic-components/ui';

/** A whole card as the label: a press anywhere on it switches. */
@Component({
  selector: 'app-choice-card-switch-demo',
  imports: [
    FormField,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScLabel,
    ScSwitch,
  ],
  template: `
    <div scFieldGroup class="w-full max-w-sm">
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldContentWrapper>
            <div scFieldTitle>Share across devices</div>
            <p scFieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </p>
          </div>
          <input scSwitch [formField]="focusForm.share" />
        </div>
      </label>
      <label scLabel>
        <div scField orientation="horizontal">
          <div scFieldContentWrapper>
            <div scFieldTitle>Enable notifications</div>
            <p scFieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </p>
          </div>
          <input scSwitch [formField]="focusForm.notifications" />
        </div>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChoiceCardSwitchDemo {
  protected readonly focusForm = form(
    signal({ share: false, notifications: true }),
  );
}
