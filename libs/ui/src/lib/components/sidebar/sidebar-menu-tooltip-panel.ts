import { Component, computed, input, output } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * The text of a collapsed menu button, in the tooltip's look (the preset's
 * `tooltip`): created by `ScSidebarMenuTooltip`, not used on its own.
 */
@Component({
  selector: 'div[scSidebarMenuTooltipPanel]',
  template: `{{ text()
    }}<span
      aria-hidden="true"
      [attr.data-side]="side()"
      [class]="arrowClass()"
    ></span>`,
  host: {
    'data-slot': 'tooltip',
    role: 'tooltip',
    '[id]': 'id()',
    '[attr.data-side]': 'side()',
    '[class]': 'class()',
    '(pointerenter)': 'hovered.emit(true)',
    '(pointerleave)': 'hovered.emit(false)',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
})
export class ScSidebarMenuTooltipPanel {
  private readonly styles = injectPreset().tooltip;

  readonly text = input('');
  readonly id = input('');
  readonly side = input<'left' | 'right'>('right');
  readonly hovered = output<boolean>();

  protected readonly class = computed(() =>
    cn('relative duration-100', this.styles.popup),
  );
  protected readonly arrowClass = computed(() =>
    cn('absolute', this.styles.arrow),
  );
}
