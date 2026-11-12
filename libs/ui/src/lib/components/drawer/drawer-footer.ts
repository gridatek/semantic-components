import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** The drawer's actions, at its bottom. */
@Directive({
  selector: 'div[scDrawerFooter]',
  host: { '[class]': 'class()' },
})
export class ScDrawerFooter {
  private readonly styles = injectPreset().drawer;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
