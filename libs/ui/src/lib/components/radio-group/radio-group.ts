import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scRadioGroup]',
  host: {
    'data-slot': 'radio-group',
    role: 'radiogroup',
    '[attr.aria-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScRadioGroup {
  private readonly styles = injectPreset().radioGroup;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly disabled = input(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      this.orientation() === 'horizontal'
        ? 'flex flex-row gap-4'
        : this.styles.group,
      this.classInput(),
    ),
  );
}
