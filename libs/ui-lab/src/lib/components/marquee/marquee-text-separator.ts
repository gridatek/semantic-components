import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarqueeTextSeparator]',
  host: {
    '[class]': 'class()',
  },
})
export class ScMarqueeTextSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground inline-block px-2', this.classInput()),
  );
}
