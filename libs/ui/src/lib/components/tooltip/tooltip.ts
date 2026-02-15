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
  tooltipClass: string;
  tooltipId: string;
}

export const SC_TOOLTIP_DATA = new InjectionToken<ScTooltipData>(
  'SC_TOOLTIP_DATA',
);

type ScTooltipState = 'open' | 'closed';

@Component({
  selector: 'sc-tooltip',
  template: `
    {{ data.content }}
  `,
  host: {
    'data-slot': 'tooltip',
    role: 'tooltip',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[id]': 'data.tooltipId',
    '[class]': 'hostClass()',
    '[attr.data-state]': 'state()',
    '(animationend)': 'onAnimationEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTooltip {
  private readonly elementRef = inject(ElementRef);

  readonly data = inject(SC_TOOLTIP_DATA);
  readonly state = signal<ScTooltipState>('open');
  readonly animationComplete = output<void>();

  protected readonly hostClass = computed(() =>
    cn(
      'bg-primary text-primary-foreground z-50 rounded-md px-3 py-1.5 text-xs max-w-xs',
      'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      this.data.tooltipClass,
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
