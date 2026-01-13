import { MenuContent } from '@angular/aria/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scMenuContent]',
  hostDirectives: [MenuContent],
  host: {
    'data-slot': 'menu-content',
  },
})
export class ScMenuContent {}
