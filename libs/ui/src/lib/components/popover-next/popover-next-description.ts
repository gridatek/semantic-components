import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScPopoverNextProvider } from './popover-next-provider';

/** The popover's description: read with it. */
@Directive({
  selector: 'p[scPopoverNextDescription]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScPopoverNextDescription {
  private readonly styles = injectPreset().popover;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-popover-desc-');

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );

  constructor() {
    const popover = inject(ScPopoverNextProvider);
    popover.descriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => popover.descriptionId.set(null));
  }
}
