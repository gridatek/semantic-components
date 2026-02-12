import { booleanAttribute, computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants, type ScButtonVariants } from '../button';

@Directive({
  selector: 'a[sc-link]',
  host: {
    'data-slot': 'link',
    '[attr.href]': '!disabled() ? href() : null',
    '[attr.role]': 'disabled() ? "link" : null',
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
      this.classInput(),
    ),
  );
}
