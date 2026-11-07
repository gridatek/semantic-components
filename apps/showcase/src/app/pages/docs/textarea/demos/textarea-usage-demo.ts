import { Component, ViewEncapsulation } from '@angular/core';
import { ScTextarea } from '@semantic-components/ui';

@Component({
  selector: 'app-textarea-usage-demo',
  imports: [ScTextarea],
  template: `
    <textarea
      scTextarea
      placeholder="Type your message here."
      aria-label="Message"
      class="max-w-sm"
    ></textarea>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextareaUsageDemo {}
