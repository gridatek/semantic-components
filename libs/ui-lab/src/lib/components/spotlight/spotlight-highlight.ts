import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightState } from './spotlight-state';

@Component({
  selector: 'div[scSpotlightHighlight]',
  template: `
    <!-- Pulse animation ring -->
    <div
      class="bg-primary/20 absolute inset-0 animate-ping rounded-[inherit]"
      [style.animation-duration]="'1.5s'"
    ></div>
    <!-- Solid border -->
    <div
      class="border-primary absolute inset-0 rounded-[inherit] border-2"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'spotlight-highlight',
    '[class]': 'class()',
    '[style.top.px]': 'top()',
    '[style.left.px]': 'left()',
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
    '[style.border-radius.px]': 'state.borderRadius()',
    '[style.transition-duration.ms]': 'state.animationDuration()',
  },
})
export class ScSpotlightHighlight {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScSpotlightState);

  protected readonly top = computed(
    () => this.state.targetRect()!.top - this.state.padding(),
  );

  protected readonly left = computed(
    () => this.state.targetRect()!.left - this.state.padding(),
  );

  protected readonly width = computed(
    () => this.state.targetRect()!.width + this.state.padding() * 2,
  );

  protected readonly height = computed(
    () => this.state.targetRect()!.height + this.state.padding() * 2,
  );

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute transition-all',
      'shadow-[0_0_0_4px_rgba(var(--primary),0.2)]',
      this.classInput(),
    ),
  );
}
