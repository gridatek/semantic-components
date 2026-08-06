import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScContextMenu } from './context-menu';
import { ScContextMenuTrigger } from './context-menu-trigger';
import { SC_CONTEXT_MENU_PROVIDER } from './context-menu-types';

/**
 * Catches the right-click and records where it happened. ScContextMenu reads
 * that position to park its anchor, and the overlay does the rest.
 */
@Component({
  selector: 'div[scContextMenuProvider]',
  providers: [
    { provide: SC_CONTEXT_MENU_PROVIDER, useExisting: ScContextMenuProvider },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'context-menu-provider',
    '[class]': 'class()',
    '(contextmenu)': 'onContextMenu($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScContextMenuProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly trigger = contentChild(ScContextMenuTrigger);
  private readonly contextMenu = contentChild(ScContextMenu);

  /** Viewport coordinates of the last right-click. */
  readonly position = signal({ x: 0, y: 0 });

  protected readonly class = computed(() => cn('block', this.classInput()));

  protected onContextMenu(event: MouseEvent): void {
    if (!this.trigger()) {
      return;
    }

    event.preventDefault();
    this.position.set({ x: event.clientX, y: event.clientY });
    this.contextMenu()?.open();
  }
}
