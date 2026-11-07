import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui';

/** disabled: dimmed, and nothing can be typed. */
@Component({
  selector: 'app-disabled-textarea-demo',
  imports: [ScField, ScLabel, ScTextarea],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>Message</label>
      <textarea
        scTextarea
        placeholder="Type your message here."
        disabled
      ></textarea>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTextareaDemo {}
