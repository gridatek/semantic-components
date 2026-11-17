import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'thead[scTableHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('[&_tr]:border-b', this.classInput()),
  );
}
