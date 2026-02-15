import { Directive } from '@angular/core';
import { TabContent } from '@angular/aria/tabs';

@Directive({
  selector: 'ng-template[scTabContent]',
  hostDirectives: [TabContent],
})
export class ScTabContent {}
