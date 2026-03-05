import { ComboboxDialog } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  afterRenderEffect,
  computed,
  contentChild,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'dialog[scComboboxDialog]',
  hostDirectives: [ComboboxDialog],
  host: {
    'data-slot': 'combobox-dialog',
    '[class]': 'class()',
  },
})
export class ScComboboxDialog {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-border bg-popover text-popover-foreground absolute rounded-md border p-0 shadow-md backdrop:bg-transparent',
      this.classInput(),
    ),
  );

  private readonly comboboxDialog = inject(ComboboxDialog);
  private readonly listbox = contentChild(Listbox, { descendants: true });

  constructor() {
    afterRenderEffect(() => {
      if (this.comboboxDialog.combobox.expanded()) {
        untracked(() => this.listbox()?.gotoFirst());
        this.positionDialog();
      }
    });

    afterRenderEffect(() => {
      if ((this.listbox()?.values().length ?? 0) > 0) {
        untracked(() => this.comboboxDialog.close());
      }
    });
  }

  // TODO(wagnermaciel): Switch to using the CDK for positioning.
  private positionDialog() {
    const comboboxRect = this.comboboxDialog.combobox
      .inputElement()
      ?.getBoundingClientRect();
    const scrollY = window.scrollY;
    if (comboboxRect) {
      this.comboboxDialog.element.style.width = `${comboboxRect.width}px`;
      this.comboboxDialog.element.style.top = `${comboboxRect.bottom + scrollY + 4}px`;
      this.comboboxDialog.element.style.left = `${comboboxRect.left - 1}px`;
    }
  }
}
