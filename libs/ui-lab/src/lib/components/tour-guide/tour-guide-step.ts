import { Directive, TemplateRef, inject, input } from '@angular/core';
import type { ScPlacementSide } from '../../utilities/spotlight-placement';

/**
 * A step: your markup — `<ng-template scTourGuideStep [for]="target">` —
 * its title (`scTourGuideTitle`) and text. On its target (an element:
 * a template reference), on its `side`; without one, centred.
 */
@Directive({
  selector: 'ng-template[scTourGuideStep]',
})
export class ScTourGuideStep {
  readonly template = inject(TemplateRef);

  /** The element it shows; none, the card is centred. */
  readonly for = input<Element | null>(null);
  /** Where the card goes; it flips when there is no room. */
  readonly side = input<ScPlacementSide>('bottom');
  /** The room around the target, in the spotlight, in pixels. */
  readonly padding = input(8);
}
