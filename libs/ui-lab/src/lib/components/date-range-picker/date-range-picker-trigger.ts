import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { ScPopoverProvider, cn } from '@semantic-components/ui';

@Directive({
  selector: 'button[scDateRangePickerTrigger]',
  exportAs: 'scDateRangePickerTrigger',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'popover.open()',
    '(click)': 'togglePopover()',
  },
})
export class ScDateRangePickerTrigger {
  readonly popover = inject(ScPopoverProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-9 w-full min-w-[240px] items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
      'hover:bg-accent/50',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
      this.classInput(),
    ),
  );

  togglePopover(): void {
    this.popover.open.update((v) => !v);
  }
}
