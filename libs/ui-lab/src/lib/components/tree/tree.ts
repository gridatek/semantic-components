import { Tree } from '@angular/aria/tree';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * A tree of expandable items (`role="tree"`), built on `@angular/aria`'s
 * `Tree`. One Tab stop; arrows move between visible items, ArrowRight/Left
 * expand, collapse and move in and out of groups, Enter/Space select.
 */
@Directive({
  selector: 'ul[scTree]',
  hostDirectives: [
    {
      directive: Tree,
      inputs: [
        'value',
        'multi',
        'selectionMode',
        'disabled',
        'softDisabled',
        'orientation',
        'wrap',
        'typeaheadDelay',
        'nav',
        'currentType',
      ],
      outputs: ['valueChange'],
    },
  ],
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
    cn('flex flex-col gap-0.5', this.classInput()),
  );
}
