import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scCommandGroupLabel]',
  host: {
    'data-slot': 'command-group-label',
    '[class]': 'class()',
  },
})
export class ScCommandGroupLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'px-2 py-1.5 text-xs font-medium text-muted-foreground',
      this.classInput(),
    ),
  );
}
