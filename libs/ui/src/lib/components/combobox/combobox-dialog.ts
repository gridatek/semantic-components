import { Combobox } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  contentChild,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCombobox } from './combobox';

@Directive({
  selector: 'dialog[scComboboxDialog]',
  host: {
    // Named for upstream's slot so input-group's
    // in-data-[slot=combobox-content] rules apply.
    'data-slot': 'combobox-content',
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

  private readonly element =
    inject<ElementRef<HTMLDialogElement>>(ElementRef).nativeElement;
  private readonly combobox = inject(Combobox);
  private readonly listbox = contentChild(Listbox, { descendants: true });
  private readonly scCombobox = inject(ScCombobox);

  constructor() {
    afterRenderEffect(() => {
      if (this.combobox.expanded()) {
        if (!this.element.open) {
          this.element.showModal();
        }
        untracked(() => this.listbox()?.gotoFirst());
        this.positionDialog();
      } else if (this.element.open) {
        this.element.close();
      }
    });

    afterRenderEffect(() => {
      if ((this.listbox()?.value().length ?? 0) > 0) {
        untracked(() => this.combobox.expanded.set(false));
      }
    });
  }

  // TODO(wagnermaciel): Switch to using the CDK for positioning.
  private positionDialog() {
    const comboboxRect = this.scCombobox
      .origin()
      .elementRef.nativeElement.getBoundingClientRect();
    const scrollY = window.scrollY;
    if (comboboxRect) {
      this.element.style.width = `${comboboxRect.width}px`;
      this.element.style.top = `${comboboxRect.bottom + scrollY + 4}px`;
      this.element.style.left = `${comboboxRect.left - 1}px`;
    }
  }
}
