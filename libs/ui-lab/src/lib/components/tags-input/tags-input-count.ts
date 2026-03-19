import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TAGS_INPUT } from './tags-input';

@Directive({
  selector: '[scTagsInputCount]',
  host: {
    'data-slot': 'tags-input-count',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
    '[textContent]': 'countText()',
  },
})
export class ScTagsInputCount {
  readonly tagsInput = inject(SC_TAGS_INPUT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly showMax = input<boolean>(true);

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );

  protected readonly countText = computed(() => {
    const count = this.tagsInput.tags().length;
    if (!this.showMax()) return `${count}`;
    const max = this.tagsInput.maxTags();
    return max !== null ? `${count} / ${max}` : `${count}`;
  });
}
