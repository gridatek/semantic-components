import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCardFooter]',
  host: {
    'data-slot': 'card-footer',
    '[class]': 'class()',
  },
})
export class ScCardFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted/50 rounded-b-xl border-t p-(--card-spacing) flex items-center',
      this.classInput(),
    ),
  );
}
