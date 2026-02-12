import {
  computed,
  Directive,
  ElementRef,
  InjectionToken,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { cn } from '../../utils';

// Token for tag input context
export const SC_TAG_INPUT = new InjectionToken<ScTagInput>('SC_TAG_INPUT');

// ============================================================================
// TagInput
// ============================================================================
@Directive({
  selector: '[sc-tag-input]',
  exportAs: 'scTagInput',
  providers: [{ provide: SC_TAG_INPUT, useExisting: ScTagInput }],
  host: {
    'data-slot': 'tag-input',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-focused]': 'isFocused() || null',
    '(click)': 'focusInput()',
  },
})
export class ScTagInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly tags = model<string[]>([]);
  readonly placeholder = input<string>('Add tag...');
  readonly disabled = input<boolean>(false);
  readonly maxTags = input<number | null>(null);
  readonly allowDuplicates = input<boolean>(false);
  readonly delimiters = input<string[]>(['Enter', ',']);
  readonly minLength = input<number>(1);
  readonly maxLength = input<number | null>(null);

  readonly tagAdd = output<string>();
  readonly tagRemove = output<string>();

  readonly isFocused = signal(false);
  readonly inputValue = signal('');

  private inputRef: ElementRef<HTMLInputElement> | null = null;

  protected readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2',
      'focus-within:ring-1 focus-within:ring-ring focus-within:border-ring',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      this.classInput(),
    ),
  );

  readonly canAddMore = computed(() => {
    const max = this.maxTags();
    if (max === null) return true;
    return this.tags().length < max;
  });

  setInputRef(ref: ElementRef<HTMLInputElement>): void {
    this.inputRef = ref;
  }

  focusInput(): void {
    if (!this.disabled()) {
      this.inputRef?.nativeElement.focus();
    }
  }

  addTag(value: string): boolean {
    const trimmed = value.trim();

    // Validation
    if (trimmed.length < this.minLength()) return false;
    if (this.maxLength() !== null && trimmed.length > this.maxLength()!)
      return false;
    if (!this.canAddMore()) return false;
    if (!this.allowDuplicates() && this.tags().includes(trimmed)) return false;

    this.tags.update((tags) => [...tags, trimmed]);
    this.tagAdd.emit(trimmed);
    return true;
  }

  removeTag(tag: string): void {
    if (this.disabled()) return;
    this.tags.update((tags) => tags.filter((t) => t !== tag));
    this.tagRemove.emit(tag);
  }

  removeTagAtIndex(index: number): void {
    if (this.disabled()) return;
    const tag = this.tags()[index];
    if (tag) {
      this.tags.update((tags) => tags.filter((_, i) => i !== index));
      this.tagRemove.emit(tag);
    }
  }

  removeLastTag(): void {
    const tags = this.tags();
    if (tags.length > 0) {
      this.removeTagAtIndex(tags.length - 1);
    }
  }

  clearAll(): void {
    if (this.disabled()) return;
    const removed = [...this.tags()];
    this.tags.set([]);
    removed.forEach((tag) => this.tagRemove.emit(tag));
  }
}
