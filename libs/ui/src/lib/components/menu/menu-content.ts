import { MenuContent } from '@angular/aria/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scMenuContent]',
  hostDirectives: [MenuContent],
})
export class ScMenuContent {}
