import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scMessageHeader]',
  host: {
    'data-slot': 'message-header',
    '[class]': 'class()',
  },
})
export class ScMessageHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0',
      this.classInput(),
    ),
  );
}
