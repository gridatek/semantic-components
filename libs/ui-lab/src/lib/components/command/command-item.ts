import { Option } from '@angular/aria/listbox';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scCommandItem]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label'],
    },
  ],
  host: {
    'data-slot': 'command-item',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScCommandItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabled = input<boolean>(false);

  readonly select = output<void>();

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
      'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
      'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
      'data-selected:bg-muted data-selected:text-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );

  onClick(): void {
    if (!this.disabled()) {
      this.select.emit();
    }
  }
}
