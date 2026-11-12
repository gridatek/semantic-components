import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
