import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** confettiEffect="fireworks": bursts here and there, for three seconds — or the duration you give. */
@Component({
  selector: 'app-fireworks-confetti-next-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: `
    <button
      scButton
      confettiEffect="fireworks"
      [scConfetti]="{ duration: 3000 }"
    >
      Fireworks
    </button>
  `,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FireworksConfettiNextDemo {}
