import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MenuTrigger } from '@angular/aria/menu';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'button[sc-menu-trigger]',
  hostDirectives: [MenuTrigger, CdkOverlayOrigin],
  host: {
    'data-slot': 'menu-trigger',
    '[class]': 'class()',
  },
})
export class ScMenuTrigger {
  readonly trigger = inject(MenuTrigger);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.classInput(),
    ),
  );
}
