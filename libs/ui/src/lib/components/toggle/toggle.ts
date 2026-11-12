import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import type {
  ScToggleSize,
  ScToggleVariant,
} from '@semantic-components/presets';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { SC_TOGGLE_VALUES } from './toggle-values';

/** A toggle's look: its variant and size, the classes the preset's. */
export interface ScToggleVariants {
  variant?: ScToggleVariant | null;
  size?: ScToggleSize | null;
}

/**
 * A button that stays pressed: `aria-pressed` follows `pressed`. In the
 * preset's look (its `toggle` key, shadcn's toggleVariants in each style).
 * In a container holding pressed values (a toolbar's widget group): its
 * `value`, pressed when the container has it.
 */
@Directive({
  selector: 'button[scToggle]',
  host: {
    type: 'button',
    'data-slot': 'toggle',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'isPressed()',
    '[attr.data-state]': 'isPressed() ? "on" : "off"',
    '[disabled]': 'isDisabled()',
    '(click)': 'toggle()',
  },
})
export class ScToggle {
  private readonly styles = injectPreset().toggle;
  private readonly values = inject(SC_TOGGLE_VALUES, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  /** Pressed: two-way. */
  readonly pressed = model<boolean>(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');
  /** In a container holding pressed values: this toggle's. */
  readonly value = input<unknown>(undefined);

  /** Its container's, when it has a value there; its own otherwise. */
  private readonly inContainer = computed(
    () => !!this.values && this.value() !== undefined,
  );
  protected readonly isPressed = computed(() =>
    this.inContainer() ? this.values!.has(this.value()) : this.pressed(),
  );
  protected readonly isDisabled = computed(
    () => this.disabled() || (this.inContainer() && this.values!.disabled()),
  );

  protected readonly class = computed(() =>
    cn(
      this.styles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected toggle(): void {
    if (this.isDisabled()) return;
    if (this.inContainer()) this.values!.toggle(this.value());
    else this.pressed.update((v) => !v);
  }
}
