import { MenuTrigger } from '@angular/aria/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scMenuTrigger]',
  exportAs: 'scMenuTrigger',
  hostDirectives: [
    {
      directive: MenuTrigger,
      inputs: ['menu', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'menu-trigger',
  },
})
export class ScMenuTrigger {}
