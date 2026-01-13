import { MenuContent } from '@angular/aria/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scAriaMenuContent]',
  hostDirectives: [MenuContent],
  host: {
    'data-slot': 'aria-menu-content',
  },
})
export class ScAriaMenuContent {}
