import { computed, Directive, inject, input } from '@angular/core';
import { Tree } from '@angular/aria/tree';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'ul[scTree]',
  hostDirectives: [Tree],
  exportAs: 'scTree',
  host: {
    'data-slot': 'tree',
    '[class]': 'class()',
  },
})
export class ScTree {
  readonly tree = inject(Tree);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-1', this.classInput()),
  );
}
