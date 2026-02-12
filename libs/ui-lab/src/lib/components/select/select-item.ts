import { Option } from '@angular/aria/listbox';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-select-item]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label'],
    },
  ],
  host: {
    'data-slot': 'select-item',
    '[class]': 'class()',
  },
})
export class ScSelectItem {
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
      'relative flex min-h-9 cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 pr-8 text-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'data-[active=true]:ring-2 data-[active=true]:ring-ring data-[active=true]:ring-offset-1',
      'aria-selected:bg-accent/50 aria-selected:text-accent-foreground',
      this.classInput(),
    ),
  );
}
