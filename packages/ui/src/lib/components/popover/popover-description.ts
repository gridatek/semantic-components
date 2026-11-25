import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScPopoverProvider } from './popover-provider';

/** The popover's description: read with it. */
@Directive({
  selector: 'p[scPopoverDescription]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScPopoverDescription {
  private readonly styles = injectStyle().popover;
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly id = inject(_IdGenerator).getId('sc-popover-desc-');

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );

  constructor() {
    const popover = inject(ScPopoverProvider);
    popover.descriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => popover.descriptionId.set(null));
  }
}
