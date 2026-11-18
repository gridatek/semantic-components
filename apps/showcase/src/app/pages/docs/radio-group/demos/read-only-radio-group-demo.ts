import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, readonly } from '@angular/forms/signals';
import { ScField, ScRadio, ScRadioGroup } from '@semantic-components/ui';

/** Read-only in its form: the choice shows and takes focus, but doesn't change. */
@Component({
  selector: 'app-read-only-radio-group-demo',
  imports: [FormField, ScRadio, ScRadioGroup, ScField],
  template: `
    <div
      scRadioGroup
      [formField]="planForm.plan"
      aria-label="Plan"
      class="w-fit"
    >
      <label scField orientation="horizontal">
        <input scRadio value="free" />
        Free
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="pro" />
        Pro
      </label>
      <label scField orientation="horizontal">
        <input scRadio value="team" />
        Team
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyRadioGroupDemo {
  private readonly planForm = form(signal({ plan: 'pro' }), (path) => {
    readonly(path.plan);
  });
}
