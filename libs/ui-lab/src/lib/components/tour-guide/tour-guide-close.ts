import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: 'button[scTourGuideClose]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'state.close()',
  },
})
export class ScTourGuideClose {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute top-2 end-2',
      this.classInput(),
    ),
  );
}
