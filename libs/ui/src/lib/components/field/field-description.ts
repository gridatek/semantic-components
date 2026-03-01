import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { _IdGenerator } from '@angular/cdk/a11y';

@Directive({
  selector: '[scFieldDescription]',
  host: {
    'data-slot': 'field-description',
    '[attr.id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScFieldDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-field-description-',
  );

  readonly idInput = input('', { alias: 'id' });

  // Priority: explicit id  > own fallback id
  readonly id = computed(() => this.idInput() || this.fallbackId);

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance',
      'last:mt-0 nth-last-2:-mt-1',
      '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
      this.classInput(),
    ),
  );
}
