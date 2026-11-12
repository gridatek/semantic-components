import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'span[scBreadcrumbPage]',
  host: {
    role: 'link',
    'aria-disabled': 'true',
    'aria-current': 'page',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbPage {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-foreground font-normal', this.classInput()),
  );
}
