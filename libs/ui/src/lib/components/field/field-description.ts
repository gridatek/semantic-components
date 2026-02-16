import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-field-description]',
  host: {
    'data-slot': 'field-description',
    '[class]': 'class()',
  },
})
export class ScFieldDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance',
      'last:mt-0 nth-last-2:-mt-1',
      '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      this.classInput(),
    ),
  );
}
