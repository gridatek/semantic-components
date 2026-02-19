import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MenuTrigger } from '@angular/aria/menu';
import { Directive, inject } from '@angular/core';

@Directive({
  selector: 'button[scMenuTrigger]',
  hostDirectives: [MenuTrigger, CdkOverlayOrigin],
  host: {
    'data-slot': 'menu-trigger',
  },
})
export class ScMenuTrigger {
  readonly trigger = inject(MenuTrigger);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
}
