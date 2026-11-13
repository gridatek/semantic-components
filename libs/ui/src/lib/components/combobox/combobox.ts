import { ComboboxPopup } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  model,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { ScPortalOutlet } from '../portal-outlet/portal-outlet';
import { ScComboboxBase } from './combobox-base';
import { ScComboboxPortal } from './combobox-portal';
import { scComboboxTemplate } from './combobox-template';

/**
 * A select to filter, as Base UI's Combobox: an input over a list of your
 * options, one of which is its value (never free text). Bound with
 * `[formField]` or `[(value)]`; `null` when none. With `multiple`, several
 * values (`ScComboboxMultiple`). You filter the options, by `query()`.
 */
@Component({
  selector: 'div[scCombobox]:not([multiple])',
  exportAs: 'scCombobox',
  imports: [ComboboxPopup, OverlayModule, ScPortalOutlet],
  providers: [{ provide: ScComboboxBase, useExisting: ScCombobox }],
  template: scComboboxTemplate,
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCombobox<T = string>
  extends ScComboboxBase<T>
  implements FormValueControl<T | null>
{
  /** The selected value, or null. */
  readonly value = model<T | null>(null);

  readonly multiple = false;
  readonly selected = computed<readonly T[]>(() => {
    const value = this.value();
    return value === null || value === undefined ? [] : [value];
  });
  readonly portal = contentChild.required(ScComboboxPortal);

  setSelected(values: readonly T[]): void {
    this.value.set(values[0] ?? null);
  }
}
