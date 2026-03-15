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
  selector: 'svg[scTourGuideMask]',
  template: `
    <svg:defs>
      <svg:mask id="tour-mask">
        <svg:rect x="0" y="0" width="100%" height="100%" fill="white" />
        @if (state.targetRect()) {
          <svg:rect
            [attr.x]="state.targetRect()!.left - state.highlightPadding()"
            [attr.y]="state.targetRect()!.top - state.highlightPadding()"
            [attr.width]="
              state.targetRect()!.width + state.highlightPadding() * 2
            "
            [attr.height]="
              state.targetRect()!.height + state.highlightPadding() * 2
            "
            rx="8"
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
      mask="url(#tour-mask)"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'tour-guide-mask',
    '[class]': 'class()',
  },
})
export class ScTourGuideMask {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScTourGuideState);

  protected readonly overlayFill = computed(
    () => `rgba(0,0,0,${this.state.overlayOpacity()})`,
  );

  protected readonly class = computed(() =>
    cn('pointer-events-none absolute inset-0 h-full w-full', this.classInput()),
  );
}
