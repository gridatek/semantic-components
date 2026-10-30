import { Directive, booleanAttribute, computed, input } from '@angular/core';
import type {
  ScButtonVariant,
  ScInputGroupButtonSize,
} from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * A button inside an input group's addon: the preset's button (ghost by
 * default), sized for the group (`injectPreset().inputGroupButton`), its
 * corners following the group's.
 */
@Directive({
  selector: 'button[scInputGroupButton]',
  host: {
    'data-slot': 'button',
    '[attr.type]': 'type()',
    '[attr.data-size]': 'size()',
    '[disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScInputGroupButton {
  private readonly preset = injectPreset();

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariant>('ghost');
  readonly size = input<ScInputGroupButtonSize>('xs');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      this.preset.button({ variant: this.variant() }),
      this.preset.inputGroupButton({ size: this.size() }),
      this.classInput(),
    ),
  );
}
