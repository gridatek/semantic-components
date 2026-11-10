import {
  Directive,
  booleanAttribute,
  computed,
  input,
  model,
} from '@angular/core';
import type {
  ScToggleSize,
  ScToggleVariant,
} from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A toggle's look: its variant and size, the classes the preset's. */
export interface ScToggleVariants {
  variant?: ScToggleVariant | null;
  size?: ScToggleSize | null;
}

/**
 * A button that stays pressed: `aria-pressed` follows `pressed`. In the
 * preset's look (its `toggle` key, shadcn's toggleVariants in each style).
 */
@Directive({
  selector: 'button[scToggle]',
  host: {
    type: 'button',
    'data-slot': 'toggle',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[disabled]': 'disabled()',
    '(click)': 'toggle()',
  },
})
export class ScToggle {
  private readonly styles = injectPreset().toggle;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Pressed: two-way. */
  readonly pressed = model<boolean>(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      this.styles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected toggle(): void {
    if (!this.disabled()) {
      this.pressed.update((v) => !v);
    }
  }
}
