import { Combobox } from '@angular/aria/combobox';
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
  selector: 'div[scSelectPopup]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'select-popup',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectPopup {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(Combobox);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground ring-foreground/10 relative z-50 mt-1 flex w-full max-h-44 min-w-36 flex-col overflow-x-hidden overflow-y-auto rounded-lg p-1 shadow-md ring-1',
      this.combobox.expanded()
        ? 'opacity-100 visible transition-[max-height,opacity,visibility] duration-150 ease-out'
        : 'max-h-0 opacity-0 invisible transition-[max-height,opacity,visibility] duration-150 ease-in [transition-delay:0s,0s,150ms]',
      this.classInput(),
    ),
  );
}
