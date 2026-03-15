import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Component({
  selector: 'div[scTourGuideHighlight]',
  template: `
    <div class="bg-primary/10 absolute inset-0 animate-pulse rounded-lg"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'tour-guide-highlight',
    '[class]': 'class()',
    '[style.top.px]': 'top()',
    '[style.left.px]': 'left()',
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
  },
})
export class ScTourGuideHighlight {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = inject(ScTourGuideState);

  private readonly padding = this.state.highlightPadding;

  protected readonly top = computed(
    () => this.state.targetRect()!.top - this.padding(),
  );

  protected readonly left = computed(
    () => this.state.targetRect()!.left - this.padding(),
  );

  protected readonly width = computed(
    () => this.state.targetRect()!.width + this.padding() * 2,
  );

  protected readonly height = computed(
    () => this.state.targetRect()!.height + this.padding() * 2,
  );

  protected readonly class = computed(() =>
    cn(
      'border-primary pointer-events-none absolute rounded-lg border-2 transition-all duration-300',
      this.classInput(),
    ),
  );
}
