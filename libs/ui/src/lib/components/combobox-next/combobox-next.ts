import { ComboboxPopup } from '@angular/aria/combobox';
import { Directionality } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  model,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { ScPortalOutlet } from '../portal-outlet/portal-outlet';
import { ScComboboxNextBase } from './combobox-next-base';
import { ScComboboxNextPortal } from './combobox-next-portal';
import { scComboboxNextTemplate } from './combobox-next-template';

/**
 * A select to filter, as Base UI's Combobox: an input over a list of your
 * options, one of which is its value (never free text). Bound with
 * `[formField]` or `[(value)]`; `null` when none. With `multiple`, several
 * values (`ScComboboxNextMultiple`). You filter the options, by `query()`.
 */
@Component({
  selector: 'div[scComboboxNext]:not([multiple])',
  exportAs: 'scComboboxNext',
  imports: [ComboboxPopup, OverlayModule, ScPortalOutlet],
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: ScComboboxNextBase, useExisting: ScComboboxNext },
  ],
  template: scComboboxNextTemplate,
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxNext<T = string>
  extends ScComboboxNextBase<T>
  implements FormValueControl<T | null>
{
  /** The selected value, or null. */
  readonly value = model<T | null>(null);

  readonly multiple = false;
  readonly selected = computed<readonly T[]>(() => {
    const value = this.value();
    return value === null || value === undefined ? [] : [value];
  });
  readonly portal = contentChild.required(ScComboboxNextPortal);

  setSelected(values: readonly T[]): void {
    this.value.set(values[0] ?? null);
  }
}
