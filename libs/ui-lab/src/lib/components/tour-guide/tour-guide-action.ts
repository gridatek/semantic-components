import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: 'button[scTourGuideAction]',
  host: {
    'data-slot': 'tour-guide-action',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScTourGuideAction {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly action = input.required<'previous' | 'next' | 'finish'>();

  private readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() => {
    const isPrimary = this.action() === 'next' || this.action() === 'finish';
    return cn(
      isPrimary
        ? 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm'
        : 'hover:bg-accent rounded-md border px-3 py-1.5 text-sm',
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
