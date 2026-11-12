import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ScComboboxGroup } from './combobox-group';

/** A group's heading: it names the group. */
@Directive({
  selector: 'div[scComboboxGroupLabel]',
  host: {
    'data-slot': 'combobox-label',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScComboboxGroupLabel {
  private readonly styles = injectPreset().combobox;
  protected readonly id = inject(_IdGenerator).getId('sc-combobox-group-');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.groupLabel, this.classInput()),
  );

  constructor() {
    const group = inject(ScComboboxGroup, { optional: true });
    group?.labelId.set(this.id);
    inject(DestroyRef).onDestroy(() => group?.labelId.set(null));
  }
}
