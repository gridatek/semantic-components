import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TAGS_INPUT } from './tags-input';

@Directive({
  selector: 'input[scTagsInputControl]',
  host: {
    'data-slot': 'tags-input-control',
    type: 'text',
    '[class]': 'class()',
    '[placeholder]': 'tagsInput.canAddMore() ? tagsInput.placeholder() : ""',
    '[disabled]': 'tagsInput.disabled() || !tagsInput.canAddMore()',
    '[value]': 'displayValue()',
    '(input)': 'onInput($event)',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(paste)': 'onPaste($event)',
  },
})
export class ScTagsInputControl {
  readonly tagsInput = inject(SC_TAGS_INPUT);
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly addOnBlur = input<boolean>(false);

  protected readonly displayValue = computed(() => this.tagsInput.inputValue());

  protected readonly class = computed(() =>
    cn(
      'flex-1 min-w-[120px] bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-sm',
      'file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    this.tagsInput.setInputRef(this.elementRef);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tagsInput.inputValue.set(value);
  }

  onFocus(): void {
    this.tagsInput.isFocused.set(true);
    this.tagsInput.focusedTagIndex.set(-1);
  }

  onKeydown(event: KeyboardEvent): void {
    const value = this.tagsInput.inputValue();
    const delimiters = this.tagsInput.delimiters();

    if (delimiters.includes(event.key)) {
      event.preventDefault();
      if (value.trim()) {
        if (this.tagsInput.addTag(value)) {
          this.tagsInput.inputValue.set('');
        }
      }
      return;
    }

    if (event.key === 'ArrowLeft' && !value) {
      const tags = this.tagsInput.tags();
      if (tags.length > 0) {
        event.preventDefault();
        this.tagsInput.focusTag(tags.length - 1);
      }
      return;
    }

    if (event.key === 'Backspace' && !value) {
      event.preventDefault();
      this.tagsInput.removeLastTag();
    }
  }

  onBlur(): void {
    this.tagsInput.isFocused.set(false);

    if (this.addOnBlur()) {
      const value = this.tagsInput.inputValue();
      if (value.trim()) {
        if (this.tagsInput.addTag(value)) {
          this.tagsInput.inputValue.set('');
        }
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    const delimiters = this.tagsInput.delimiters();
    const pastedText = event.clipboardData?.getData('text') ?? '';

    const textDelimiters = delimiters.filter((d) => d !== 'Enter');
    const hasDelimiters = textDelimiters.some((d) => pastedText.includes(d));

    if (hasDelimiters) {
      event.preventDefault();

      let tags = [pastedText];
      textDelimiters.forEach((delimiter) => {
        tags = tags.flatMap((t) => t.split(delimiter));
      });

      tags.forEach((tag) => {
        if (tag.trim()) {
          this.tagsInput.addTag(tag);
        }
      });

      this.tagsInput.inputValue.set('');
    }
  }
}
