import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * The area that opens the context menu. It is focusable so keyboard users can
 * open the menu too: the Menu key or Shift+F10 fire `contextmenu` on the
 * focused element (the browser reports its centre as the position).
 */
@Directive({
  selector: '[scContextMenuTrigger]',
  host: {
    'data-slot': 'context-menu-trigger',
    tabindex: '0',
    '[class]': 'class()',
  },
})
export class ScContextMenuTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-full w-full items-center justify-center rounded-md border border-dashed text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );
}
