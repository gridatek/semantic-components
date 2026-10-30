import { Directive, booleanAttribute, computed, input } from '@angular/core';
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
 * (`provideScConfig({ preset })`, from `@semantic-components/presets`;
 * nova by default), chosen when the app starts.
 */
@Directive({
  selector: 'button[scButton]',
  host: {
    '[attr.type]': 'type()',
    '[disabled]': 'disabled()',
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

  protected readonly class = computed(() =>
    cn(
      this.styles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
