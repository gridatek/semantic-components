import { MenuTrigger } from '@angular/aria/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scAriaMenuTrigger]',
  hostDirectives: [
    {
      directive: MenuTrigger,
      inputs: ['menu', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'aria-menu-trigger',
  },
})
export class ScAriaMenuTrigger {}
