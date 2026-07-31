import {
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
  host: {
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

  protected readonly top = computed(() => {
    const rect = this.state.targetRect();
    return rect ? rect.top - this.state.padding() : 0;
  });

  protected readonly left = computed(() => {
    const rect = this.state.targetRect();
    return rect ? rect.left - this.state.padding() : 0;
  });

  protected readonly width = computed(() => {
    const rect = this.state.targetRect();
    return rect ? rect.width + this.state.padding() * 2 : 0;
  });

  protected readonly height = computed(() => {
    const rect = this.state.targetRect();
    return rect ? rect.height + this.state.padding() * 2 : 0;
  });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute transition-all',
      'shadow-[0_0_0_4px_rgba(var(--primary),0.2)]',
      this.classInput(),
    ),
  );
}
