import { Option } from '@angular/aria/listbox';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn, useActiveOption } from '../../utils';
import { SC_COMBOBOX } from './combobox-tokens';

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
    '(pointermove)': 'onPointerMove()',
  },
})
export class ScComboboxItem {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(SC_COMBOBOX);
  private readonly option = inject<Option<string>>(Option);
  protected readonly onPointerMove = useActiveOption(this.option);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      const label =
        this.option.label() ||
        this.elementRef.nativeElement.textContent?.trim() ||
        '';
      this.combobox.registerLabel(this.option.value(), label);
    });

    effect((onCleanup) => {
      const value = this.option.value();
      this.combobox.setRendered(value, true);
      onCleanup(() => this.combobox.setRendered(value, false));
    });
  }

  protected readonly class = computed(() =>
    cn(
      'group transition-colors duration-100 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:text-primary relative flex cursor-pointer items-center gap-2 rounded-md py-1 pe-8 ps-1.5 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50',
      "[&_svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );
}
