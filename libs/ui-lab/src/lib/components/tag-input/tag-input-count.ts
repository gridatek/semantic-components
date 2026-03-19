import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TAG_INPUT_FIELD } from './tag-input-field';

@Directive({
  selector: '[scTagInputCount]',
  host: {
    'data-slot': 'tag-input-count',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[class]': 'class()',
    '[textContent]': 'countText()',
  },
})
export class ScTagInputCount {
  readonly tagInput = inject(SC_TAG_INPUT_FIELD);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly showMax = input<boolean>(true);

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );

  protected readonly countText = computed(() => {
    const count = this.tagInput.tags().length;
    if (!this.showMax()) return `${count}`;
    const max = this.tagInput.maxTags();
    return max !== null ? `${count} / ${max}` : `${count}`;
  });
}
