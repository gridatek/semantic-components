import { Component, ViewEncapsulation } from '@angular/core';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-input-demo',
  imports: [ScInput],
  template: `
    <input
      scInput
      placeholder="Enter text"
      aria-label="Text"
      class="max-w-xs"
    />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicInputDemo {}
