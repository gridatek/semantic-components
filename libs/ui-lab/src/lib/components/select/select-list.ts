import { Combobox } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-select-list]',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [Listbox],
  host: {
    'data-slot': 'select-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectList {
  readonly listbox = inject(Listbox);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(Combobox);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground z-50 mt-1 flex w-full max-h-44 min-w-[8rem] flex-col gap-0.5 overflow-auto rounded-md border p-1 shadow-md',
      this.combobox.expanded()
        ? 'opacity-100 visible transition-[max-height,opacity,visibility] duration-150 ease-out'
        : 'max-h-0 opacity-0 invisible transition-[max-height,opacity,visibility] duration-150 ease-in [transition-delay:0s,0s,150ms]',
      this.classInput(),
    ),
  );
}
