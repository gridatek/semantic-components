import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScPopoverNextProvider } from './popover-next-provider';

/** The popover's title: it names the popover (its heading level is yours). */
@Directive({
  selector: '[scPopoverNextTitle]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScPopoverNextTitle {
  private readonly styles = injectPreset().popover;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-popover-title-');

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );

  constructor() {
    const popover = inject(ScPopoverNextProvider);
    popover.titleId.set(this.id);
    inject(DestroyRef).onDestroy(() => popover.titleId.set(null));
  }
}
