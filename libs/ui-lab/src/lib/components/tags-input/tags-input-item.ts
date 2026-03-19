import {
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { badgeVariants, cn } from '@semantic-components/ui';
import { SC_TAGS_INPUT } from './tags-input';

export const SC_TAGS_INPUT_ITEM = new InjectionToken<ScTagsInputItem>(
  'ScTagsInputItem',
);

@Directive({
  selector: '[scTagsInputItem]',
  exportAs: 'scTagsInputItem',
  providers: [{ provide: SC_TAGS_INPUT_ITEM, useExisting: ScTagsInputItem }],
  host: {
    'data-slot': 'tags-input-item',
    '[class]': 'class()',
    '[tabindex]': 'tabIndex()',
    '[attr.data-focused]': 'isFocused() || null',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus()',
  },
})
export class ScTagsInputItem {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly tagsInput = inject(SC_TAGS_INPUT);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly tag = input.required<string>();
  readonly index = input.required<number>();
  readonly variant = input<'default' | 'secondary' | 'outline'>('default');

  protected readonly isFocused = computed(
    () => this.tagsInput.focusedTagIndex() === this.index(),
  );

  protected readonly tabIndex = computed(() => (this.isFocused() ? 0 : -1));

  protected readonly class = computed(() =>
    cn(
      badgeVariants({ variant: this.variant() }),
      'max-w-[150px]',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      if (this.tagsInput.focusedTagIndex() === this.index()) {
        this.elementRef.nativeElement.focus();
      }
    });
  }

  protected onFocus(): void {
    this.tagsInput.focusedTagIndex.set(this.index());
  }

  protected onKeydown(event: KeyboardEvent): void {
    const index = this.index();
    const tags = this.tagsInput.tags();

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          this.tagsInput.focusTag(index - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (index < tags.length - 1) {
          this.tagsInput.focusTag(index + 1);
        } else {
          this.tagsInput.focusedTagIndex.set(-1);
          this.tagsInput.focusInput();
        }
        break;
      case 'Home':
        event.preventDefault();
        this.tagsInput.focusTag(0);
        break;
      case 'End':
        event.preventDefault();
        this.tagsInput.focusedTagIndex.set(-1);
        this.tagsInput.focusInput();
        break;
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        this.tagsInput.removeTagAtIndex(index);
        break;
    }
  }
}
