import { Combobox } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSelect } from './select';

@Component({
  selector: 'div[scSelectPopup]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'select-popup',
    '[class]': 'class()',
    '(animationend)': 'onAnimationEnd()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectPopup {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(Combobox);
  private readonly select = inject(ScSelect);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground ring-foreground/10 z-50 flex w-full max-h-44 min-w-36 flex-col overflow-auto rounded-lg p-1 shadow-md ring-1',
      this.combobox.expanded()
        ? 'animate-in fade-in-0 zoom-in-95 duration-150'
        : 'animate-out fade-out-0 zoom-out-95 duration-150',
      this.classInput(),
    ),
  );

  protected onAnimationEnd(): void {
    if (!this.combobox.expanded()) {
      this.select.closeOverlay();
    }
  }
}
