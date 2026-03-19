import {
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TAG_INPUT_FIELD } from './tag-input-field';

export const SC_TAG_INPUT_TAG = new InjectionToken<ScTagInputTag>(
  'ScTagInputTag',
);

@Directive({
  selector: '[scTagInputTag]',
  exportAs: 'scTagInputTag',
  providers: [{ provide: SC_TAG_INPUT_TAG, useExisting: ScTagInputTag }],
  host: {
    'data-slot': 'tag-input-tag',
    '[class]': 'class()',
    '[tabindex]': 'tabIndex()',
    '[attr.data-focused]': 'isFocused() || null',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus()',
  },
})
export class ScTagInputTag {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly tagInput = inject(SC_TAG_INPUT_FIELD);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly tag = input.required<string>();
  readonly index = input.required<number>();
  readonly variant = input<'default' | 'secondary' | 'outline'>('default');

  protected readonly isFocused = computed(
    () => this.tagInput.focusedTagIndex() === this.index(),
  );

  protected readonly tabIndex = computed(() => (this.isFocused() ? 0 : -1));

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors',
      'max-w-[150px]',
      'focus:outline-none focus:ring-1 focus:ring-ring',
      this.variant() === 'default' && 'bg-primary text-primary-foreground',
      this.variant() === 'secondary' &&
        'bg-secondary text-secondary-foreground',
      this.variant() === 'outline' && 'border bg-background',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      if (this.tagInput.focusedTagIndex() === this.index()) {
        this.elementRef.nativeElement.focus();
      }
    });
  }

  protected onFocus(): void {
    this.tagInput.focusedTagIndex.set(this.index());
  }

  protected onKeydown(event: KeyboardEvent): void {
    const index = this.index();
    const tags = this.tagInput.tags();

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          this.tagInput.focusTag(index - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (index < tags.length - 1) {
          this.tagInput.focusTag(index + 1);
        } else {
          this.tagInput.focusedTagIndex.set(-1);
          this.tagInput.focusInput();
        }
        break;
      case 'Home':
        event.preventDefault();
        this.tagInput.focusTag(0);
        break;
      case 'End':
        event.preventDefault();
        this.tagInput.focusedTagIndex.set(-1);
        this.tagInput.focusInput();
        break;
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        this.tagInput.removeTagAtIndex(index);
        break;
    }
  }
}
