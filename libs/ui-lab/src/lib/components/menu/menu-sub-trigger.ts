import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MenuItem } from '@angular/aria/menu';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-menu-sub-trigger]',
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value'],
    },
    CdkOverlayOrigin,
  ],
  host: {
    'data-slot': 'menu-sub-trigger',
    '[class]': 'class()',
  },
})
export class ScMenuSubTrigger {
  readonly menuItem = inject(MenuItem);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
