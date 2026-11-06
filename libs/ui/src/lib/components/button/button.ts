import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import type {
  ScButtonSize,
  ScButtonVariant,
} from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A button's look: its variant and size, the classes the preset's. */
export interface ScButtonVariants {
  variant?: ScButtonVariant | null;
  size?: ScButtonSize | null;
}

/**
 * A button in the app's preset: its classes are the preset's
 * (`provideSemanticComponents({ preset })`, from `@semantic-components/presets`;
 * nova by default), chosen when the app starts.
 *
 * `disabled` with `softDisabled`: disabled but still reachable — announced
 * and styled as disabled (`aria-disabled`), yet it keeps its focus and hover
 * (a tooltip can say why), and nothing presses it. Angular Aria's
 * `softDisabled`; Base UI's `focusableWhenDisabled`, Angular Material's
 * `disabledInteractive`.
 */
@Directive({
  selector: 'button[scButton]',
  host: {
    // Read by the button group's styles (borders beside an input).
    'data-slot': 'button',
    '[attr.type]': 'type()',
    '[disabled]': 'disabled() && !softDisabled()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScButton {
  private readonly styles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
  /** Disabled, yet focusable and hoverable (with `disabled`). */
  readonly softDisabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      this.styles({ variant: this.variant(), size: this.size() }),
      // The preset's aria-disabled blocks the pointer: a soft-disabled
      // button keeps its hover (its tooltip).
      this.disabled() && this.softDisabled()
        ? 'pointer-events-auto cursor-not-allowed'
        : '',
      this.classInput(),
    ),
  );

  constructor() {
    // Soft-disabled: nothing presses it — a click, Enter or Space (which
    // click) stops here, before your handlers (capture runs first).
    const element =
      inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
    const stop = (event: Event) => {
      if (this.disabled() && this.softDisabled()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    element.addEventListener('click', stop, { capture: true });
    inject(DestroyRef).onDestroy(() =>
      element.removeEventListener('click', stop, { capture: true }),
    );
  }
}
