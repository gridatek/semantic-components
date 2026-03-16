import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TAG_INPUT_FIELD } from './tag-input-field';

@Directive({
  selector: 'input[scTagInputInput]',
  host: {
    'data-slot': 'tag-input-input',
    type: 'text',
    '[class]': 'class()',
    '[placeholder]': 'tagInput.canAddMore() ? tagInput.placeholder() : ""',
    '[disabled]': 'tagInput.disabled() || !tagInput.canAddMore()',
    '[value]': 'tagInput.inputValue()',
    '(input)': 'onInput($event)',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'tagInput.isFocused.set(true)',
    '(blur)': 'onBlur()',
    '(paste)': 'onPaste($event)',
  },
})
export class ScTagInputInput {
  readonly tagInput = inject(SC_TAG_INPUT_FIELD);
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly addOnBlur = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );

  constructor() {
    this.tagInput.setInputRef(this.elementRef);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tagInput.inputValue.set(value);
  }

  onKeydown(event: KeyboardEvent): void {
    const value = this.tagInput.inputValue();
    const delimiters = this.tagInput.delimiters();

    if (delimiters.includes(event.key)) {
      event.preventDefault();
      if (value.trim()) {
        if (this.tagInput.addTag(value)) {
          this.tagInput.inputValue.set('');
        }
      }
      return;
    }

    if (event.key === 'Backspace' && !value) {
      event.preventDefault();
      this.tagInput.removeLastTag();
    }
  }

  onBlur(): void {
    this.tagInput.isFocused.set(false);

    if (this.addOnBlur()) {
      const value = this.tagInput.inputValue();
      if (value.trim()) {
        if (this.tagInput.addTag(value)) {
          this.tagInput.inputValue.set('');
        }
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    const delimiters = this.tagInput.delimiters();
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
          this.tagInput.addTag(tag);
        }
      });

      this.tagInput.inputValue.set('');
    }
  }
}
