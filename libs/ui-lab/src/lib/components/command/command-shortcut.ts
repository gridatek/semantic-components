import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-command-shortcut]',
  host: {
    'data-slot': 'command-shortcut',
    '[class]': 'class()',
  },
})
export class ScCommandShortcut {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'ml-auto text-xs tracking-widest text-muted-foreground',
      this.classInput(),
    ),
  );
}
