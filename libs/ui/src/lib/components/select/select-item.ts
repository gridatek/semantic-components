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
import { injectPreset } from '../../config/preset';
import { cn, setInput, useActiveOption } from '../../utils';
import { SC_SELECT } from './select-tokens';

/** An option. Its label is `label`, or its text. */
@Directive({
  selector: 'div[scSelectItem]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    '[class]': 'class()',
    '(pointermove)': 'onPointerMove()',
  },
})
export class ScSelectItem {
  private readonly select = inject(SC_SELECT);
  private readonly option = inject<Option<string>>(Option);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly styles = injectPreset().select;
  protected readonly onPointerMove = useActiveOption(this.option);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.item, this.classInput()),
  );

  constructor() {
    // Type-ahead matches an option's label: without one, its text.
    afterNextRender(() => {
      if (this.option.label()) return;
      const text = this.element.nativeElement.textContent?.trim();
      if (text) setInput(this.option.label, text);
    });
    effect(() => {
      const label =
        this.option.label() ||
        this.element.nativeElement.textContent?.trim() ||
        '';
      this.select.registerLabel(this.option.value(), label);
    });
  }
}
