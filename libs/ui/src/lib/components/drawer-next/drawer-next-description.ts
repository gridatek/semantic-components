import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDrawerNextProvider } from './drawer-next-provider';

/** The drawer's description: read with it. */
@Directive({
  selector: 'p[scDrawerNextDescription]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScDrawerNextDescription {
  private readonly styles = injectPreset().drawer;
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly id = inject(_IdGenerator).getId('sc-drawer-desc-');

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );

  constructor() {
    const drawer = inject(ScDrawerNextProvider);
    drawer.descriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => drawer.descriptionId.set(null));
  }
}
