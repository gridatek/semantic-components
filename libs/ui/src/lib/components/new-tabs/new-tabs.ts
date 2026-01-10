import { Tabs } from '@angular/aria/tabs';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scNewTabs]',
  hostDirectives: [Tabs],
  host: {
    'data-slot': 'tabs',
  },
})
export class ScNewTabs {}
