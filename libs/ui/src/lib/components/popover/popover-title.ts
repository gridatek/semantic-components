import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
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
  private readonly styles = injectStyle().popover;
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly id = inject(_IdGenerator).getId('sc-popover-title-');

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );

  constructor() {
    const popover = inject(ScPopoverProvider);
    popover.titleId.set(this.id);
    inject(DestroyRef).onDestroy(() => popover.titleId.set(null));
  }
}
