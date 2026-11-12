import { Option } from '@angular/aria/listbox';
import {
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { setInput, useActiveOption } from '../../utils';
import { ScComboboxBase } from './combobox-base';

/** An option (Angular Aria's Option): its `value`; its label is `label`, or its text. */
@Directive({
  selector: 'div[scComboboxItem]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'combobox-item',
    '[class]': 'class()',
    '(pointermove)': 'root.highlightItemOnHover() && onPointerMove()',
  },
})
export class ScComboboxItem<T = unknown> {
  private readonly styles = injectPreset().combobox;
  protected readonly root = inject<ScComboboxBase<T>>(ScComboboxBase);
  private readonly option = inject<Option<T>>(Option);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly onPointerMove = useActiveOption(this.option);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.item, this.classInput()),
  );

  constructor() {
    afterNextRender(() => {
      if (this.option.label()) return;
      const text = this.element.textContent?.trim();
      if (text) setInput(this.option.label, text);
    });

    effect(() => {
      const label =
        this.option.label() || this.element.textContent?.trim() || '';
      this.root.registerLabel(this.option.value(), label);
    });

    effect((onCleanup) => {
      const value = this.option.value();
      this.root.setRendered(value, true);
      onCleanup(() => this.root.setRendered(value, false));
    });
  }
}
