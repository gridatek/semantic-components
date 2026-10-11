import { TabContent } from '@angular/aria/tabs';
import { Directive } from '@angular/core';

/**
 * A panel's content (aria `TabContent`): created while its step is active,
 * destroyed when you leave it — keep state in your model (e.g. Signal Forms),
 * not in the DOM. Every `scStepperPanel` needs one.
 */
@Directive({
  selector: 'ng-template[scStepperContent]',
  hostDirectives: [TabContent],
})
export class ScStepperContent {}
