import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scSelectInputGroup]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'select-input-group',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectInputGroup {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 flex h-8 w-full items-center gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors select-none outline-none focus-visible:ring-3 has-aria-disabled:cursor-not-allowed has-aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
