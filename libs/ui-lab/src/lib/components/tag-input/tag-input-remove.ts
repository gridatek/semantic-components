import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TAG_INPUT_FIELD } from './tag-input-field';
import { SC_TAG_INPUT_TAG } from './tag-input-tag';

@Directive({
  selector: 'button[scTagInputRemove]',
  host: {
    'data-slot': 'tag-input-remove',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '[disabled]': 'isDisabled()',
    '(click)': 'onClick($event)',
  },
})
export class ScTagInputRemove {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly tagInput = inject(SC_TAG_INPUT_FIELD);
  private readonly tagRef = inject(SC_TAG_INPUT_TAG);

  protected readonly isDisabled = this.tagInput.disabled;

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
    this.tagInput.removeTagAtIndex(this.tagRef.index());
  }
}
