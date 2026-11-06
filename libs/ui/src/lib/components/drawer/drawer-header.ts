import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The drawer's title and description, at its top. */
@Directive({
  selector: 'div[scDrawerHeader]',
  host: { '[class]': 'class()' },
})
export class ScDrawerHeader {
  private readonly styles = injectPreset().drawer;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
