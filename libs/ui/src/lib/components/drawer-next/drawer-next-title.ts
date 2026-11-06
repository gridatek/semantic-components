import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDrawerNextProvider } from './drawer-next-provider';

/** The drawer's title: it names the drawer. */
@Directive({
  selector: 'h2[scDrawerNextTitle]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScDrawerNextTitle {
  private readonly styles = injectPreset().drawer;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-drawer-title-');

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );

  constructor() {
    const drawer = inject(ScDrawerNextProvider);
    drawer.titleId.set(this.id);
    inject(DestroyRef).onDestroy(() => drawer.titleId.set(null));
  }
}
