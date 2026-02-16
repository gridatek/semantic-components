import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  InjectionToken,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

export interface ScTooltipData {
  content: string;
  tooltipId: string;
}

export const SC_TOOLTIP_DATA = new InjectionToken<ScTooltipData>(
  'SC_TOOLTIP_DATA',
);

type ScTooltipState = 'open' | 'closed';
type ScTooltipSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'sc-tooltip',
  template: `
    {{ data.content }}
    <span
      [attr.data-side]="side()"
      class="absolute size-2.5 rotate-45 rounded-[2px] bg-primary z-50
             data-[side=top]:-bottom-[5px] data-[side=top]:left-1/2 data-[side=top]:-translate-x-1/2
             data-[side=bottom]:-top-[5px] data-[side=bottom]:left-1/2 data-[side=bottom]:-translate-x-1/2
             data-[side=left]:-right-[5px] data-[side=left]:top-1/2 data-[side=left]:-translate-y-1/2
             data-[side=right]:-left-[5px] data-[side=right]:top-1/2 data-[side=right]:-translate-y-1/2"
    ></span>
  `,
  host: {
    'data-slot': 'tooltip',
    role: 'tooltip',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[id]': 'data.tooltipId',
    '[class]': 'hostClass()',
    '[attr.data-open]': 'state() === "open" ? true : null',
    '[attr.data-closed]': 'state() === "closed" ? true : null',
    '[attr.data-side]': 'side()',
    '(animationend)': 'onAnimationEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTooltip {
  private readonly elementRef = inject(ElementRef);

  readonly data = inject(SC_TOOLTIP_DATA);
  readonly state = signal<ScTooltipState>('open');
  readonly side = signal<ScTooltipSide>('top');
  readonly animationComplete = output<void>();

  protected readonly hostClass = computed(() =>
    cn(
      'bg-primary text-primary-foreground z-50 rounded-md px-3 py-1.5 text-xs w-fit max-w-xs',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    ),
  );

  protected onAnimationEnd(event: AnimationEvent): void {
    // Only emit when close animation completes
    if (
      this.state() === 'closed' &&
      event.target === this.elementRef.nativeElement
    ) {
      this.animationComplete.emit();
    }
  }

  close(): void {
    this.state.set('closed');
  }
}
