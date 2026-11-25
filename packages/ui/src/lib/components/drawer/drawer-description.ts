import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScDrawerProvider } from './drawer-provider';

/** The drawer's description: read with it. */
@Directive({
  selector: 'p[scDrawerDescription]',
  host: {
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScDrawerDescription {
  private readonly styles = injectStyle().drawer;
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly id = inject(_IdGenerator).getId('sc-drawer-desc-');

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );

  constructor() {
    const drawer = inject(ScDrawerProvider);
    drawer.descriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => drawer.descriptionId.set(null));
  }
}
