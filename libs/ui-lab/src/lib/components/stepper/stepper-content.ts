import { TabContent } from '@angular/aria/tabs';
import { Directive } from '@angular/core';

/**
 * A panel's content (aria `TabContent`): created the first time its step
 * becomes active, then kept. Every `scStepperPanel` needs one.
 */
@Directive({
  selector: 'ng-template[scStepperContent]',
  hostDirectives: [TabContent],
})
export class ScStepperContent {}
