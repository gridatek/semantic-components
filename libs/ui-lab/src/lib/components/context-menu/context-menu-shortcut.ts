import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-context-menu-shortcut]',
  host: {
    'data-slot': 'context-menu-shortcut',
    '[class]': 'class()',
  },
})
export class ScContextMenuShortcut {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'ml-auto text-xs tracking-widest text-muted-foreground',
      this.classInput(),
    ),
  );
}
