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
      'hover:bg-accent data-[active=true]:bg-accent aria-selected:bg-accent/50 aria-selected:text-accent-foreground flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm outline-none [&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
