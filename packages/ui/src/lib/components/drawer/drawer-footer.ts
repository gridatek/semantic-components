import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The drawer's actions, at its bottom. */
@Directive({
  selector: 'div[scDrawerFooter]',
  host: { '[class]': 'class()' },
})
export class ScDrawerFooter {
  private readonly styles = injectStyle().drawer;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
