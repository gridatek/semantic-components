import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** What is empty — best a heading, at the page's level (h2–h6). */
@Directive({
  selector:
    'div[scEmptyTitle], h2[scEmptyTitle], h3[scEmptyTitle], h4[scEmptyTitle], h5[scEmptyTitle], h6[scEmptyTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScEmptyTitle {
  private readonly styles = injectPreset().empty;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
