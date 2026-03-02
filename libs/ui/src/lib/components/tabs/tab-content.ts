import { TabContent } from '@angular/aria/tabs';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scTabContent]',
  hostDirectives: [TabContent],
})
export class ScTabContent {}
