import { Directive } from '@angular/core';
import { MenuContent } from '@angular/aria/menu';

@Directive({
  selector: 'ng-template[scMenuContent]',
  hostDirectives: [MenuContent],
})
export class ScMenuContent {}
