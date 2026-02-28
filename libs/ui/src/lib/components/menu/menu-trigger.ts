import { Directive, inject } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MenuTrigger } from '@angular/aria/menu';

@Directive({
  selector: '[scMenuTrigger]',
  exportAs: 'scMenuTrigger',
  hostDirectives: [
    {
      directive: MenuTrigger,
    },
    CdkOverlayOrigin,
  ],
  host: {
    'data-slot': 'menu-trigger',
  },
})
export class ScMenuTrigger {
  readonly trigger = inject(MenuTrigger);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly expanded = this.trigger.expanded;
}
