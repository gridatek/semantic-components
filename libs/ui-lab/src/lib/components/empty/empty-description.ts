import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-empty-description]',
  host: {
    'data-slot': 'empty-description',
    '[class]': 'class()',
  },
})
export class ScEmptyDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-sm/relaxed text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      this.classInput(),
    ),
  );
}
