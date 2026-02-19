import { Option } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';

import { ScSelectItemIndicator } from './select-item-indicator';

@Component({
  selector: 'div[scSelectItem]',
  imports: [ScSelectItemIndicator, SiCheckIcon],
  template: `
    <ng-content />
    <svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg>
  `,
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
