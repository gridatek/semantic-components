import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'tbody[scTableBody]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableBody {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('[&_tr:last-child]:border-0', this.classInput()),
  );
}
