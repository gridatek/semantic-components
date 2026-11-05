import { TabContent } from '@angular/aria/tabs';
import { Directive } from '@angular/core';

/** A panel's content, in a template: created when the panel is shown. */
@Directive({
  selector: 'ng-template[scTabsNextContent]',
  hostDirectives: [TabContent],
})
export class ScTabsNextContent {}
