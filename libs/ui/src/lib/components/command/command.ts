import { Combobox } from '@angular/aria/combobox';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn } from '../../utils';

@Directive({
  selector: 'div[scCommand]',
  exportAs: 'scCommand',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScCommand {
  private readonly combobox = inject(Combobox);

  /** The underlying aria combobox, for binding to `ngComboboxPopup`. */
  readonly comboboxRef = this.combobox;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex size-full flex-col overflow-hidden rounded-xl bg-popover p-1 text-popover-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(this.combobox.alwaysExpanded, true);
  }
}
