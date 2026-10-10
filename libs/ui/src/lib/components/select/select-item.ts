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
import { SC_SELECT } from './select-tokens';

@Component({
  selector: 'div[scSelectItem]',
  template: `
    <ng-content />
  `,
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'select-item',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelectItem {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly select = inject(SC_SELECT);
  private readonly option = inject<Option<string>>(Option);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full cursor-default select-none items-center gap-1.5 rounded-md py-1 pe-8 ps-1.5 text-sm outline-hidden',
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      'aria-selected:bg-accent/50 aria-selected:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      '[&_svg:not([class*=size-])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      const label =
        this.option.label() ||
        this.elementRef.nativeElement.textContent?.trim() ||
        '';
      this.select.registerLabel(this.option.value(), label);
    });

    effect(() => {
      if (this.option.active()) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }
}
