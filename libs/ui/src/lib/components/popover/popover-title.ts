import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScPopoverProvider } from './popover-provider';

/** The popover's title: it names the popover (its heading level is yours). */
@Directive({
  selector: '[scPopoverTitle]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScPopoverTitle {
  private readonly styles = injectPreset().popover;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-popover-title-');

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );

  constructor() {
    const popover = inject(ScPopoverProvider);
    popover.titleId.set(this.id);
    inject(DestroyRef).onDestroy(() => popover.titleId.set(null));
  }
}
