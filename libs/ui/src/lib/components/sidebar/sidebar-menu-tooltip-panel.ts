import { Component, computed, input, output } from '@angular/core';
import {
  SC_TOOLTIP_CONTEXT,
  ScTooltip,
  ScTooltipArrow,
  type ScTooltipContext,
} from '../tooltip';

/**
 * The text of a collapsed menu button, as a tooltip: the Tooltip's own parts
 * (`scTooltip`, `scTooltipArrow`), given their context here in place of a
 * `scTooltipProvider`. Created by `ScSidebarMenuTooltip`, not used on its
 * own.
 */
@Component({
  selector: 'div[scSidebarMenuTooltipPanel]',
  imports: [ScTooltip, ScTooltipArrow],
  providers: [
    {
      provide: SC_TOOLTIP_CONTEXT,
      useExisting: ScSidebarMenuTooltipPanel,
    },
  ],
  template: ` <div scTooltip>{{ text() }}<span scTooltipArrow></span></div> `,
})
export class ScSidebarMenuTooltipPanel implements ScTooltipContext {
  readonly text = input('');
  readonly idInput = input('', { alias: 'id' });
  readonly side = input<'left' | 'right'>('right');
  readonly hovered = output<boolean>();

  get id(): string {
    return this.idInput();
  }
  readonly placedSide = computed<string>(() => this.side());

  keepOpen(): void {
    this.hovered.emit(true);
  }

  hideSoon(): void {
    this.hovered.emit(false);
  }
}
