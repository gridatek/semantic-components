import {
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

export const SC_TAGS_INPUT = new InjectionToken<ScTagsInput>('ScTagsInput');

@Directive({
  selector: '[scTagsInput]',
  exportAs: 'scTagsInput',
  providers: [{ provide: SC_TAGS_INPUT, useExisting: ScTagsInput }],
  host: {
    'data-slot': 'tags-input',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-focused]': 'isFocused() || null',
    '(click)': 'focusInput()',
  },
})
export class ScTagsInput {
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
  readonly focusedTagIndex = signal(-1);

  private readonly inputRef = signal<ElementRef<HTMLInputElement> | null>(null);

  protected readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1.5 min-h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 transition-colors',
      'dark:bg-input/30',
      'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3',
      'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
      'disabled:bg-input/50 dark:disabled:bg-input/80',
      this.classInput(),
    ),
  );

  readonly canAddMore = computed(() => {
    const max = this.maxTags();
    if (max === null) return true;
    return this.tags().length < max;
  });

  setInputRef(ref: ElementRef<HTMLInputElement>): void {
    this.inputRef.set(ref);
  }

  focusInput(): void {
    if (!this.disabled()) {
      this.inputRef()?.nativeElement.focus();
    }
  }

  focusTag(index: number): void {
    if (this.disabled()) return;
    const tags = this.tags();
    if (index >= 0 && index < tags.length) {
      this.focusedTagIndex.set(index);
    }
  }

  addTag(value: string): boolean {
    const trimmed = value.trim();

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
    const index = this.tags().indexOf(tag);
    if (index !== -1) {
      this.removeTagAtIndex(index);
    }
  }

  removeTagAtIndex(index: number): void {
    if (this.disabled()) return;
    const tag = this.tags()[index];
    if (tag !== undefined) {
      this.tags.update((tags) => tags.filter((_, i) => i !== index));
      this.tagRemove.emit(tag);

      const remaining = this.tags().length;
      if (remaining === 0) {
        this.focusedTagIndex.set(-1);
        this.focusInput();
      } else if (this.focusedTagIndex() >= remaining) {
        this.focusedTagIndex.set(remaining - 1);
      }
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
    this.focusedTagIndex.set(-1);
    removed.forEach((tag) => this.tagRemove.emit(tag));
  }
}
