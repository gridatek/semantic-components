import { Combobox } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
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
  hostDirectives: [Combobox],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'combobox-search-panel',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxSearchPanel {
  private readonly combobox = inject(Combobox);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full flex-col rounded-md border-none',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => signalSetFn(this.combobox.filterMode[SIGNAL], 'manual'));
    effect(() => signalSetFn(this.combobox.alwaysExpanded[SIGNAL], true));
  }
}
