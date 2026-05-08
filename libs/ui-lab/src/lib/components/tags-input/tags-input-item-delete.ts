import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TAGS_INPUT } from './tags-input';
import { SC_TAGS_INPUT_ITEM } from './tags-input-item';

@Directive({
  selector: 'button[scTagsInputItemDelete]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '[disabled]': 'isDisabled()',
    '(click)': 'onClick($event)',
  },
})
export class ScTagsInputItemDelete {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly tagsInput = inject(SC_TAGS_INPUT);
  private readonly tagRef = inject(SC_TAGS_INPUT_ITEM);

  protected readonly isDisabled = this.tagsInput.disabled;

  protected readonly ariaLabel = computed(() => `Remove ${this.tagRef.tag()}`);

  protected readonly class = computed(() =>
    cn(
      'hover:bg-foreground/20 focus:ring-ring rounded-full focus:ring-1 focus:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected onClick(event: Event): void {
    event.stopPropagation();
    this.tagsInput.removeTagAtIndex(this.tagRef.index());
  }
}
