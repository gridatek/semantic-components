import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScSpotlightState } from './spotlight-state';

@Directive({
  selector: 'button[scSpotlightClose]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'state.close()',
  },
})
export class ScSpotlightClose {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly state = inject(ScSpotlightState);

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute top-4 end-4 z-10 rounded-full shadow-lg',
      this.classInput(),
    ),
  );
}
