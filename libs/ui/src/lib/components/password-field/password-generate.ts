import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import type { ScButtonVariants } from '../button/button';
import { ScPasswordField } from './password-field';

const SETS = {
  lower: 'abcdefghijkmnopqrstuvwxyz',
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  digits: '23456789',
  symbols: '!@#$%^&*-_=+?',
} as const;

/** A random index below `size`, from the browser's secure randomness, unbiased. */
function randomBelow(size: number): number {
  const limit = Math.floor(0x1_0000_0000 / size) * size;
  const buffer = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);
  return value % size;
}

/**
 * Fills the input with a strong password — random from the browser's secure
 * source (`crypto`), `length` characters, one at least of each set chosen
 * (look-alikes such as l, 1, O, 0 left out) — into your Signal Form, and
 * shows it. Your icon and its name inside.
 */
@Directive({
  selector: 'button[scPasswordGenerate]',
  host: {
    'data-slot': 'password-generate',
    type: 'button',
    '[disabled]': 'password.disabled()',
    '[class]': 'class()',
    '(click)': 'generate()',
  },
})
export class ScPasswordGenerate {
  private readonly buttonStyles = injectPreset().button;
  protected readonly password = inject(ScPasswordField);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly length = input(16, { transform: numberAttribute });
  readonly lower = input(true, { transform: booleanAttribute });
  readonly upper = input(true, { transform: booleanAttribute });
  readonly digits = input(true, { transform: booleanAttribute });
  readonly symbols = input(true, { transform: booleanAttribute });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scPasswordGenerate');
  }

  protected generate(): void {
    const sets = (
      [
        this.lower() && SETS.lower,
        this.upper() && SETS.upper,
        this.digits() && SETS.digits,
        this.symbols() && SETS.symbols,
      ] as const
    ).filter((set): set is (typeof SETS)[keyof typeof SETS] => !!set);
    if (!sets.length) return;
    const all = sets.join('');
    const length = Math.max(this.length(), sets.length);
    // One of each set, the rest from all of them, then shuffled.
    const chars = sets.map((set) => set[randomBelow(set.length)]);
    while (chars.length < length) chars.push(all[randomBelow(all.length)]);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomBelow(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    this.fill(chars.join(''));
  }

  private fill(value: string): void {
    const formField = this.password.field.formField();
    if (formField) {
      const state = formField.state() as unknown as {
        value: { set(value: unknown): void };
        markAsDirty?(): void;
      };
      state.value.set(value);
      state.markAsDirty?.();
    } else {
      const input = this.password.input();
      if (input) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    this.password.visible.set(true);
  }
}
