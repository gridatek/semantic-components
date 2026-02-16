import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverProvider } from './popover-provider';

@Directive({
  selector: 'button[sc-popover-trigger]',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'popover-trigger',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'popover.open()',
    '(click)': 'togglePopover()',
  },
})
export class ScPopoverTrigger {
  readonly popover = inject(ScPopoverProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  togglePopover(): void {
    this.popover.open.update((v) => !v);
  }
}
