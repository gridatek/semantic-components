import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScDrawerProvider } from './drawer-provider';

/**
 * Closes the drawer: the preset's button, outline by default (Cancel, in the
 * footer, as shadcn's). Submit: `variant="default"`; a ✕: `variant="ghost"
 * size="icon"`, named.
 */
@Directive({
  selector: 'button[scDrawerClose]',
  host: {
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'closeDrawer()',
  },
})
export class ScDrawerClose {
  private readonly drawer = inject(ScDrawerProvider);
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected closeDrawer(): void {
    this.drawer.open.set(false);
  }
}
