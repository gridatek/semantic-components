import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'caption[scTableCaption]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableCaption {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mt-4 text-sm text-muted-foreground', this.classInput()),
  );
}
