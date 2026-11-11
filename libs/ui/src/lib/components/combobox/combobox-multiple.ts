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
import { ScComboboxBase } from './combobox-base';
import { ScComboboxPortal } from './combobox-portal';
import { scComboboxTemplate } from './combobox-template';

/**
 * A combobox of several values (`multiple`): its value is the array of the
 * selected ones, shown as chips before the input. Picking an option adds or
 * removes it and keeps the list open.
 */
@Component({
  selector: 'div[scCombobox][multiple]',
  exportAs: 'scCombobox',
  imports: [ComboboxPopup, OverlayModule, ScPortalOutlet],
  providers: [
    { provide: Directionality, useClass: ScElementDirectionality },
    { provide: ScComboboxBase, useExisting: ScComboboxMultiple },
  ],
  template: scComboboxTemplate,
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxMultiple<T = string>
  extends ScComboboxBase<T>
  implements FormValueControl<T[]>
{
  /** The selected values. */
  readonly value = model<T[]>([]);

  readonly multiple = true;
  readonly selected = computed<readonly T[]>(() => this.value());
  readonly portal = contentChild.required(ScComboboxPortal);

  setSelected(values: readonly T[]): void {
    this.value.set([...values]);
  }
}
