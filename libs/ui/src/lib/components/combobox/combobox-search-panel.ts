import { Combobox } from '@angular/aria/combobox';
import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';

@Component({
  selector: 'div[scComboboxSearchPanel]',
  exportAs: 'scComboboxSearchPanel',
  hostDirectives: [Combobox],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxSearchPanel {
  private readonly combobox = inject(Combobox);

  /** The underlying aria combobox, for binding to `ngComboboxPopup`. */
  readonly comboboxRef = this.combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full flex-col rounded-md border-none',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => signalSetFn(this.combobox.alwaysExpanded[SIGNAL], true));
  }
}
