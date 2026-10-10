import { Option } from '@angular/aria/listbox';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_COMMAND } from './command-tokens';

@Directive({
  selector: 'div[scCommandItem]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'command-item',
    '[class]': 'class()',
  },
})
export class ScCommandItem {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Emitted when the item is run, by Enter or click. */
  readonly select = output<void>();

  private readonly option = inject<Option<string>>(Option);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly value = computed(() => this.option.value());

  constructor() {
    const command = inject(SC_COMMAND);
    effect((onCleanup) => {
      this.value();
      command.registerItem(this);
      onCleanup(() => command.unregisterItem(this));
    });
    inject(DestroyRef).onDestroy(() => command.unregisterItem(this));

    effect(() => {
      if (this.option.active()) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  protected readonly class = computed(() =>
    cn(
      'group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      'hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
