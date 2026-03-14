import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button';

@Directive({
  selector: 'a[scLink]',
  host: {
    'data-slot': 'link',
    '[attr.href]': 'href()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[class]': 'class()',
  },
})
export class ScLink {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');
  readonly href = input<string>('#');
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
