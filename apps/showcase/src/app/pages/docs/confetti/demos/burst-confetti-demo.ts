import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** scConfettiTrigger on a button: a click bursts from it, in the theme’s colours. Decorative — hidden from screen readers, never in the way, and none for reduced motion. */
@Component({
  selector: 'app-burst-confetti-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: ` <button scButton scConfettiTrigger>Celebrate</button> `,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BurstConfettiDemo {}
