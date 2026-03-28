import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverProvider } from '../popover';

@Directive({
  selector: 'button[scDatePickerTrigger]',
  exportAs: 'scDatePickerTrigger',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'popover.open()',
    '(click)': 'togglePopover()',
  },
})
export class ScDatePickerTrigger {
  readonly popover = inject(ScPopoverProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-10 w-[280px] items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm',
      'ring-offset-background placeholder:text-muted-foreground',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      '[&>span]:line-clamp-1',
      this.classInput(),
    ),
  );

  togglePopover(): void {
    this.popover.open.update((v) => !v);
  }
}
