import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-select-item-legacy]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    role: 'option',
    '[attr.aria-selected]': 'selected()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectItemLegacy {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly selected = input<boolean>(false);

  readonly disabled = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.selected() && 'bg-accent text-accent-foreground',
      this.disabled() && 'pointer-events-none opacity-50',
      this.classInput(),
    ),
  );
}
