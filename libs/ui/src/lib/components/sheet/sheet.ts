import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSheetProvider } from './sheet-provider';

/**
 * The sheet's panel: slides in from its side when shown and back out when it
 * goes (`animate.enter` / `animate.leave`; the side sets the direction).
 */
@Component({
  selector: 'div[scSheet]',
  template: ` <ng-content /> `,
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    '[attr.data-side]': 'sheetProvider.side()',
    '[class]': 'class()',
    '[tabindex]': '-1',
    'animate.enter': 'animate-in fade-in-0',
    'animate.leave': 'animate-out fade-out-0',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSheet {
  readonly sheetProvider = inject(ScSheetProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly sheetId = inject(_IdGenerator).getId('sc-sheet-');
  readonly titleId = `${this.sheetId}-title`;
  readonly descriptionId = `${this.sheetId}-description`;

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg duration-200 ease-in-out transition',
      // Position based on side
      'data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t',
      'data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:sm:max-w-sm',
      'data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:sm:max-w-sm',
      'data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b',
      // Where it slides from and to (read by the enter / leave animations)
      'data-[side=right]:slide-in-from-right-10 data-[side=right]:slide-out-to-right-10',
      'data-[side=left]:slide-in-from-left-10 data-[side=left]:slide-out-to-left-10',
      'data-[side=top]:slide-in-from-top-10 data-[side=top]:slide-out-to-top-10',
      'data-[side=bottom]:slide-in-from-bottom-10 data-[side=bottom]:slide-out-to-bottom-10',
      this.classInput(),
    ),
  );
}
