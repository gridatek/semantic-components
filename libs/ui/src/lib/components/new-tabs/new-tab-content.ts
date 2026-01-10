import { TabContent } from '@angular/aria/tabs';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scNewTabContent]',
  hostDirectives: [TabContent],
  host: {
    'data-slot': 'tab-content',
  },
})
export class ScNewTabContent {}
