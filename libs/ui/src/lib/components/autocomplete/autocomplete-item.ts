import { Option } from '@angular/aria/listbox';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn, useActiveOption } from '../../utils';
import { SC_AUTOCOMPLETE } from './autocomplete-tokens';

@Component({
  selector: 'div[scAutocompleteItem]',
  hostDirectives: [
    { directive: Option, inputs: ['value', 'label', 'disabled'] },
  ],
  template: ` <ng-content /> `,
  host: {
    'data-slot': 'autocomplete-item',
    '[class]': 'class()',
    '(pointermove)': 'onPointerMove()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAutocompleteItem {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly autocomplete = inject(SC_AUTOCOMPLETE);
  private readonly option = inject<Option<string>>(Option);
  protected readonly onPointerMove = useActiveOption(this.option);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      const label =
        this.option.label() ||
        this.elementRef.nativeElement.textContent?.trim() ||
        '';
      this.autocomplete.registerLabel(this.option.value(), label);
    });
  }

  protected readonly class = computed(() =>
    cn(
      'transition-colors duration-100 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground flex cursor-pointer items-center rounded-md px-2 py-1 text-sm outline-none select-none aria-selected:font-medium aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
