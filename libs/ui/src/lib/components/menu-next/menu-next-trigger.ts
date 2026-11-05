import { MenuTrigger } from '@angular/aria/menu';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_MENU_NEXT } from './menu-next-context';

/**
 * Opens the menu; behaviour only, on any button (scButton for the look). A
 * pointer open highlights no item; a keyboard open, the first.
 */
@Directive({
  selector: '[scMenuNextTrigger]',
  exportAs: 'scMenuNextTrigger',
  hostDirectives: [MenuTrigger, CdkOverlayOrigin],
  host: {
    '[class]': 'class()',
    '(pointerdown)': 'context?.quiet.set(true)',
    '(keydown)': 'context?.quiet.set(false)',
  },
})
export class ScMenuNextTrigger {
  protected readonly context = inject(SC_MENU_NEXT, { optional: true });
  readonly trigger = inject(MenuTrigger);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly expanded = this.trigger.expanded;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
