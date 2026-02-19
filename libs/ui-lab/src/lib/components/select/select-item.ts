import { Option } from '@angular/aria/listbox';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scSelectItem]',
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
      'relative flex w-full cursor-default select-none items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden',
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      'aria-selected:bg-accent/50 aria-selected:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      '[&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
