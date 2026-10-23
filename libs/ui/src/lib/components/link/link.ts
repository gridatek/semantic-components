import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button';

@Directive({
  selector: 'a[scLink]',
  host: {
    '[attr.href]': 'href()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[class]': 'class()',
  },
})
export class ScLink {
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');
  readonly href = input<string>('#');
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
