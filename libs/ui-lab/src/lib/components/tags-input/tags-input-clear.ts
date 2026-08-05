import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_TAGS_INPUT } from './tags-input';

@Directive({
  selector: 'button[scTagsInputClear]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'tagsInput.disabled() || tagsInput.tags().length === 0',
    '[attr.aria-disabled]':
      'tagsInput.disabled() || tagsInput.tags().length === 0 || null',
    '(click)': 'onClick($event)',
    '[attr.aria-label]': '"Clear all tags"',
  },
})
export class ScTagsInputClear {
  readonly tagsInput = inject(SC_TAGS_INPUT);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon-xs' }),
      'ms-auto text-muted-foreground',
      this.classInput(),
    ),
  );

  onClick(event: Event): void {
    event.stopPropagation();
    this.tagsInput.clearAll();
    this.tagsInput.focusInput();
  }
}
