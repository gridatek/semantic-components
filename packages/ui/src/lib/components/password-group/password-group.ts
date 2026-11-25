import {
  Directive,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_FIELD } from '../field';

/**
 * A password input in its box — one border, one focus ring — with its
 * buttons beside it (`scPasswordToggle`, `scPasswordGenerate`), in a
 * `scField` that gives it its label and descriptions. It holds what they
 * share: the password shown or not (`[(visible)]`).
 */
@Directive({
  selector: 'div[scPasswordGroup]',
  exportAs: 'scPasswordGroup',
  host: {
    'data-slot': 'input-group',
    '[attr.data-visible]': 'visible() || null',
    '[class]': 'class()',
  },
})
export class ScPasswordGroup {
  private readonly groupStyles = injectStyle().inputGroup;
  /** The field it is in: the input's id, its descriptions, its form field. */
  readonly field = inject(SC_FIELD, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  /** The password shown as text. */
  readonly visible = model(false);

  /** The input, once there: for the toggle and the generator. */
  readonly input = signal<HTMLInputElement | null>(null);
  /** The input's disabled state, from your Signal Form: its buttons follow. */
  readonly disabled = signal(false);

  private readonly class = computed(() =>
    cn(this.groupStyles, 'pe-1', this.classInput()),
  );

  toggle(): void {
    this.visible.update((visible) => !visible);
  }
}
