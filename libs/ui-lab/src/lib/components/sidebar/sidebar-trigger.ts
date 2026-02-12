import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSidebarState } from './sidebar-state.service';
import { buttonVariants, ScButtonVariants } from '../button';

@Directive({
  selector: 'button[sc-sidebar-trigger]',
  host: {
    'data-slot': 'sidebar-trigger',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScSidebarTrigger {
  readonly state = inject(ScSidebarState);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected onClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.state.isMobile()) {
      this.state.toggleMobile();
    } else {
      this.state.toggle();
    }
  }
}
