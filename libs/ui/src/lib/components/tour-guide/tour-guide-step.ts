import { Directive, TemplateRef, inject, input } from '@angular/core';
import type { ScOverlayLogicalSide } from '../../utils/overlay-positions';

/** Where a step's card goes: the library's sides (`inline-start` / `inline-end` follow the direction). */
export type ScTourGuideSide = ScOverlayLogicalSide;

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
  readonly side = input<ScTourGuideSide>('bottom');
  /** The room around the target, in the spotlight, in pixels. */
  readonly padding = input(8);
}
