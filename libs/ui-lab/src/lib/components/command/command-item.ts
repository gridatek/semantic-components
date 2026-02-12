import { Option } from '@angular/aria/listbox';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-command-item]',
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
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      'hover:bg-accent hover:text-accent-foreground',
      '[&>svg]:size-4 [&>svg]:shrink-0',
      this.classInput(),
    ),
  );

  onClick(): void {
    if (!this.disabled()) {
      this.select.emit();
    }
  }
}
