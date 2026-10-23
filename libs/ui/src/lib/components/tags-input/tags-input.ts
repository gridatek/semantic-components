import {
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChildren,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils/cn/cn';
import { ScTagsInputItem } from './tags-input-item';

/** Whether a tag goes in: it, and the tags already there. */
export type ScTagsInputAccept = (tag: string, tags: string[]) => boolean;

/** No duplicates. */
const unique: ScTagsInputAccept = (tag, tags) => !tags.includes(tag);

/**
 * Tags, typed: a `string[]`, a `[formField]`. Enter or the delimiter adds
 * what is typed, and so do pasting and leaving; `accept` decides first.
 * One Tab stop, the field: from it, ← (→ right to left) goes into the tags.
 */
@Directive({
  selector: '[scTagsInput]',
  exportAs: 'scTagsInput',
  host: {
    'data-slot': 'tags-input',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-full]': 'full() || null',
    '[attr.data-invalid]': '(invalid() && touched()) || null',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScTagsInput implements FormValueControl<string[]> {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model<string[]>([]);
  /**
   * The most tags; at it, nothing more is added. Set by the schema's
   * `maxLength` with a `[formField]`.
   */
  readonly maxLength = input<number | undefined>(undefined);
  /** The character that ends a tag, as Enter does. */
  readonly delimiter = input(',');
  /** Whether a tag goes in; by default, one not there already. */
  readonly accept = input<ScTagsInputAccept>(unique);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  readonly full = computed(() => {
    const max = this.maxLength();
    return max !== undefined && this.value().length >= max;
  });
  /** The text last refused by `accept`, until it is edited. */
  readonly rejected = signal(false);

  readonly items = contentChildren(
    forwardRef(() => ScTagsInputItem),
    {
      descendants: true,
    },
  );

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 flex min-h-8 w-full cursor-text flex-wrap items-center gap-1 rounded-lg border bg-transparent px-1.5 py-1 text-base transition-colors md:text-sm',
      'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3',
      'data-invalid:border-destructive data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40',
      'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
      this.classInput(),
    ),
  );

  private control: HTMLInputElement | null = null;

  /** The text field (`scTagsInputControl`). */
  ɵregister(control: HTMLInputElement | null): void {
    this.control = control;
  }

  /**
   * Adds tags — trimmed, blanks skipped — while there is room and `accept`
   * takes them. Returns those refused.
   */
  add(...tags: string[]): string[] {
    const refused: string[] = [];
    let value = this.value();
    for (const tag of tags.map((t) => t.trim()).filter(Boolean)) {
      const max = this.maxLength();
      if (
        (max !== undefined && value.length >= max) ||
        !this.accept()(tag, value)
      ) {
        refused.push(tag);
      } else {
        value = [...value, tag];
      }
    }
    if (value !== this.value()) this.value.set(value);
    return refused;
  }

  /** Removes the tag at `index`; focus goes to the one now there, or the field. */
  removeAt(index: number): void {
    if (this.disabled()) return;
    this.value.update((value) => value.filter((_, i) => i !== index));
    afterNextRender(
      () => {
        const items = this.items();
        if (items.length) items[Math.min(index, items.length - 1)].focus();
        else this.focusControl();
      },
      { injector: this.injector },
    );
  }

  clear(): void {
    if (this.disabled()) return;
    this.value.set([]);
    this.focusControl();
  }

  focusControl(): void {
    this.control?.focus();
  }

  /** Focuses the tag at `index`. */
  focusItem(index: number): void {
    this.items()[index]?.focus();
  }

  protected onClick(event: MouseEvent): void {
    // Its empty space: the field.
    if (event.target === this.host.nativeElement) this.focusControl();
  }

  protected onFocusOut(event: FocusEvent): void {
    const to = event.relatedTarget as Node | null;
    if (!to || !this.host.nativeElement.contains(to)) this.touch.emit();
  }
}
