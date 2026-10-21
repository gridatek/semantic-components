import { Directive, TemplateRef, inject, input } from '@angular/core';

/** Where a step's card goes, around its target. */
export type ScTourSide = 'top' | 'bottom' | 'start' | 'end';

/**
 * A step: your markup — `<ng-template scTourGuideNextStep [for]="target">` —
 * its title (`scTourGuideNextTitle`) and text. On its target (an element:
 * a template reference), on its `side`; without one, centred.
 */
@Directive({
  selector: 'ng-template[scTourGuideNextStep]',
})
export class ScTourGuideNextStep {
  readonly template = inject(TemplateRef);

  /** The element it shows; none, the card is centred. */
  readonly for = input<Element | null>(null);
  /** Where the card goes; it flips when there is no room. */
  readonly side = input<ScTourSide>('bottom');
  /** The room around the target, in the spotlight, in pixels. */
  readonly padding = input(8);
}
