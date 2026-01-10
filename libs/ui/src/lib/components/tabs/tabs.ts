import { Tabs } from '@angular/aria/tabs';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scTabs]',
  hostDirectives: [Tabs],
  host: {
    'data-slot': 'tabs',
  },
})
export class ScTabs {}
