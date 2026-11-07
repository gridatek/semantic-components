import {
  Directive,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

/**
 * A label, in the preset's look: its text alone; in a field — inside one, or
 * around one as a choice card — the field's look too (border, corners,
 * padding, focus ring, checked tint). In a field it names the field's
 * control (`for`), or, for a group, is named `<field id>-label`.
 */
@Directive({
  selector: 'label[scLabel]',
  host: {
    'data-slot': 'label',
    '[attr.id]': 'id()',
    '[attr.for]': 'for()',
    '[class]': 'class()',
  },
})
export class ScLabel {
  private readonly styles = injectPreset().label;
  private readonly field = inject(SC_FIELD, { optional: true });
  /** A field it wraps: a choice card. */
  private readonly wrapped = contentChild(SC_FIELD);
  readonly idInput = input<string>('', { alias: 'id' });
  readonly forInput = input<string>('', { alias: 'for' });
  readonly classInput = input<string>('', { alias: 'class' });

  /** In a field, `<field id>-label`: what names a control that is not an input (a group). */
  protected readonly id = computed(
    () =>
      this.idInput() ||
      (this.field && !this.forInput() ? `${this.field.id()}-label` : null),
  );

  protected readonly for = computed(() => {
    // Priority: explicit for input > field context
    const forValue = this.forInput() || this.field?.id();
    return forValue || null;
  });

  protected readonly class = computed(() =>
    cn(
      this.styles.label,
      (this.field || this.wrapped()) && this.styles.field,
      this.classInput(),
    ),
  );
}
