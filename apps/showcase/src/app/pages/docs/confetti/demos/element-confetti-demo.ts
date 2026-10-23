import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui/confetti';

/** Each burst starts at the centre of what was clicked — wherever it is. */
@Component({
  selector: 'app-element-confetti-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: `
    <div class="flex w-full max-w-md justify-between">
      <button scButton variant="outline" scConfettiTrigger>Left</button>
      <button scButton variant="outline" scConfettiTrigger>Middle</button>
      <button scButton variant="outline" scConfettiTrigger>Right</button>
    </div>
  `,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ElementConfettiDemo {}
