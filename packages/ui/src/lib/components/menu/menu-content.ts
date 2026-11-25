import { MenuContent } from '@angular/aria/menu';
import { Directive } from '@angular/core';

/** The menu's items, rendered once it has opened. */
@Directive({
  selector: 'ng-template[scMenuContent]',
  hostDirectives: [MenuContent],
})
export class ScMenuContent {}
