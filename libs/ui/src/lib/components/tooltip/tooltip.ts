import {
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { cn } from '../../utils';

export interface ScTooltipData {
  content: string;
  tooltipId: string;
}

export const SC_TOOLTIP_DATA = new InjectionToken<ScTooltipData>(
  'SC_TOOLTIP_DATA',
);

type ScTooltipSide = 'top' | 'right' | 'bottom' | 'left';

/** The tooltip: animates in when shown and out when it goes (`animate.enter` / `animate.leave`). */
@Component({
  selector: 'div[scTooltip]',
  template: `
    {{ data.content }}
    <span
      [attr.data-side]="side()"
      class="bg-foreground absolute z-50 size-2.5 rotate-45 rounded-[2px] data-[side=bottom]:-top-[5px] data-[side=bottom]:left-1/2 data-[side=bottom]:-translate-x-1/2 data-[side=left]:top-1/2 data-[side=left]:-right-[5px] data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2 data-[side=right]:-left-[5px] data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-[5px] data-[side=top]:left-1/2 data-[side=top]:-translate-x-1/2"
    ></span>
  `,
  host: {
    'data-slot': 'tooltip-content',
    role: 'tooltip',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[id]': 'data.tooltipId',
    '[class]': 'hostClass()',
    '[attr.data-side]': 'side()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTooltip {
  readonly data = inject(SC_TOOLTIP_DATA);
  readonly side = signal<ScTooltipSide>('top');

  protected readonly hostClass = computed(() =>
    cn(
      'bg-foreground text-background z-50 rounded-md px-3 py-1.5 text-xs w-fit max-w-xs',
      'inline-flex items-center gap-1.5',
      'has-data-[slot=kbd]:pe-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    ),
  );
}
