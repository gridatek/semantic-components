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
  selector: 'svg[scSpotlightMask]',
  template: `
    <svg:defs>
      <svg:mask [attr.id]="state.maskId">
        <svg:rect x="0" y="0" width="100%" height="100%" fill="white" />
        @if (state.targetRect()) {
          <svg:rect
            [attr.x]="state.targetRect()!.left - state.padding()"
            [attr.y]="state.targetRect()!.top - state.padding()"
            [attr.width]="state.targetRect()!.width + state.padding() * 2"
            [attr.height]="state.targetRect()!.height + state.padding() * 2"
            [attr.rx]="state.borderRadius()"
            fill="black"
          />
        }
      </svg:mask>
    </svg:defs>
    <svg:rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      [attr.fill]="overlayFill()"
      [attr.mask]="maskUrl()"
      class="transition-opacity"
      [style.transition-duration.ms]="state.animationDuration()"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'spotlight-mask',
    '[class]': 'class()',
  },
})
export class ScSpotlightMask {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScSpotlightState);

  protected readonly overlayFill = computed(
    () => `rgba(0,0,0,${this.state.overlayOpacity()})`,
  );

  protected readonly maskUrl = computed(() => `url(#${this.state.maskId})`);

  protected readonly class = computed(() =>
    cn('pointer-events-none absolute inset-0 h-full w-full', this.classInput()),
  );
}
