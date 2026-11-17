import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'svg[scMultiselectItemIndicator]',
  host: {
    '[class]': 'class()',
  },
})
export class ScMultiselectItemIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('hidden [[aria-selected=true]>&]:block', this.classInput()),
  );
}
