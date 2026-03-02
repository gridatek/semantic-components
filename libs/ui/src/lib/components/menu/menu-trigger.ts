import { MenuTrigger } from '@angular/aria/menu';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, inject } from '@angular/core';

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
