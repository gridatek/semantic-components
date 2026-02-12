import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TAG_INPUT } from './tag-input';

// ============================================================================
// TagInputField
// ============================================================================
@Component({
  selector: 'input[sc-tag-input-field]',
  template: ``,
  host: {
    'data-slot': 'tag-input-field',
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTagInputField {
  readonly tagInput = inject(SC_TAG_INPUT);
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

    // Check if key is a delimiter
    if (delimiters.includes(event.key)) {
      event.preventDefault();
      if (value.trim()) {
        if (this.tagInput.addTag(value)) {
          this.tagInput.inputValue.set('');
        }
      }
      return;
    }

    // Handle backspace to remove last tag
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

    // Check if pasted text contains delimiters (excluding Enter)
    const textDelimiters = delimiters.filter((d) => d !== 'Enter');
    const hasDelimiters = textDelimiters.some((d) => pastedText.includes(d));

    if (hasDelimiters) {
      event.preventDefault();

      // Split by all text delimiters
      let tags = [pastedText];
      textDelimiters.forEach((delimiter) => {
        tags = tags.flatMap((t) => t.split(delimiter));
      });

      // Add each tag
      tags.forEach((tag) => {
        if (tag.trim()) {
          this.tagInput.addTag(tag);
        }
      });

      this.tagInput.inputValue.set('');
    }
  }
}
