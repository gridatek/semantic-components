import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { ScDrawerProvider } from './drawer-provider';

/**
 * Closes the drawer: the style's button, outline by default (Cancel, in the
 * footer, as shadcn's). Submit: `variant="default"`; a ✕: `variant="ghost"
 * size="icon-sm"`, named.
 */
@Directive({
  selector: 'button[scDrawerClose]',
  host: {
    'data-slot': 'drawer-close',
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'drawer.close()',
  },
})
export class ScDrawerClose {
  private readonly buttonStyles = injectStyle().button;
  private readonly drawer = inject(ScDrawerProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
