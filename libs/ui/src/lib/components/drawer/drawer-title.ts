import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDrawerProvider } from './drawer-provider';

/** The drawer's title: it names the drawer. */
@Directive({
  selector: 'h2[scDrawerTitle]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScDrawerTitle {
  private readonly styles = injectPreset().drawer;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-drawer-title-');

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );

  constructor() {
    const drawer = inject(ScDrawerProvider);
    drawer.titleId.set(this.id);
    inject(DestroyRef).onDestroy(() => drawer.titleId.set(null));
  }
}
