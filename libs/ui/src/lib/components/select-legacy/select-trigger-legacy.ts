import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'button[sc-select-trigger-legacy]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-haspopup]': 'true',
    role: 'combobox',
    type: 'button',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectTriggerLegacy {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly isOpen = input<boolean>(false);
  readonly elementRef = inject(ElementRef);

  protected readonly class = computed(() =>
    cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      this.classInput(),
    ),
  );
}
