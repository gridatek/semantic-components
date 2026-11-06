import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScDrawerNextProvider } from './drawer-next-provider';

/**
 * Closes the drawer: the preset's button, outline by default (Cancel, in the
 * footer, as shadcn's). Submit: `variant="default"`; a ✕: `variant="ghost"
 * size="icon-sm"`, named.
 */
@Directive({
  selector: 'button[scDrawerNextClose]',
  host: {
    'data-slot': 'drawer-close',
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'drawer.close()',
  },
})
export class ScDrawerNextClose {
  private readonly buttonStyles = injectPreset().button;
  protected readonly drawer = inject(ScDrawerNextProvider);
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
}
