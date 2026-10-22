import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * Where an item is gripped — your grip icon, in it: with a handle, only it
 * starts a drag, and the rest of the item is free for text and controls.
 * Not a button: the item is the Tab stop, and the keyboard lifts it.
 */
@Directive({
  selector: '[scSortableListNextHandle]',
  host: {
    'data-slot': 'sortable-list-handle',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScSortableListNextHandle {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:text-foreground flex shrink-0 cursor-grab touch-manipulation items-center [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
