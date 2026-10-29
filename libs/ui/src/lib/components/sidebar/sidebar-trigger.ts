import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button';
import { ScSidebarState } from './sidebar-state';

/**
 * Opens and closes the sidebar (the sheet on phones): `aria-expanded`,
 * `aria-controls`. Your icon and its name (`sr-only`), e.g. "Sidebar".
 */
@Directive({
  selector: 'button[scSidebarTrigger]',
  host: {
    'data-slot': 'sidebar-trigger',
    type: 'button',
    '[attr.aria-expanded]': 'state.expanded()',
    '[attr.aria-controls]': 'state.sidebarId()',
    '[class]': 'class()',
    '(click)': 'state.toggle()',
  },
})
export class ScSidebarTrigger {
  private readonly buttonStyles = injectPreset().button;
  protected readonly state = inject(ScSidebarState);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'rtl:[&_svg]:rotate-180',
      this.classInput(),
    ),
  );
}
