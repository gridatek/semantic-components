import { Option } from '@angular/aria/listbox';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scMultiselectItem]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'multiselect-item',
    '[class]': 'class()',
  },
})
export class ScMultiselectItem {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly option = inject(Option);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      if (this.option.active()) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  protected readonly class = computed(() =>
    cn(
      'hover:bg-accent data-[active=true]:bg-accent aria-selected:bg-primary/10 aria-selected:text-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none [&_svg]:size-4',
      this.classInput(),
    ),
  );
}
