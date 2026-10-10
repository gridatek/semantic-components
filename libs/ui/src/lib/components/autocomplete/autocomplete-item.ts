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
import { cn } from '../../utils';
import { SC_AUTOCOMPLETE } from './autocomplete-tokens';

@Component({
  selector: 'div[scAutocompleteItem]',
  hostDirectives: [
    { directive: Option, inputs: ['value', 'label', 'disabled'] },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'autocomplete-item',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAutocompleteItem {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly autocomplete = inject(SC_AUTOCOMPLETE);
  private readonly option = inject<Option<string>>(Option);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      const label =
        this.option.label() ||
        this.elementRef.nativeElement.textContent?.trim() ||
        '';
      this.autocomplete.registerLabel(this.option.value(), label);
    });

    effect(() => {
      if (this.option.active()) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  protected readonly class = computed(() =>
    cn(
      'hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:text-accent-foreground aria-selected:bg-accent flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm outline-none select-none aria-selected:font-medium data-disabled:pointer-events-none data-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
