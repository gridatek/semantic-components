import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: 'button[scTourGuideAction]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScTourGuideAction {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly action = input.required<'previous' | 'next' | 'finish'>();
  /** Default: `default` for next and finish, `outline` for previous. */
  readonly variant = input<ScButtonVariants['variant']>();
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() => {
    const isPrimary = this.action() === 'next' || this.action() === 'finish';
    return cn(
      buttonVariants({
        variant: this.variant() ?? (isPrimary ? 'default' : 'outline'),
        size: this.size(),
      }),
      this.classInput(),
    );
  });

  protected onClick(): void {
    switch (this.action()) {
      case 'previous':
        this.state.previous();
        break;
      case 'next':
        this.state.next();
        break;
      case 'finish':
        this.state.finish();
        break;
    }
  }
}
