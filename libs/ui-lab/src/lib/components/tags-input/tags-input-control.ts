import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { SC_FIELD, cn } from '@semantic-components/ui';
import { ScTagsInput } from './tags-input';

/**
 * Where tags are typed: Enter or the delimiter adds one, a paste splits into
 * several, leaving adds what is left. In an empty field, Backspace or ←
 * (→ right to left) goes to the last tag.
 */
@Directive({
  selector: 'input[scTagsInputControl]',
  host: {
    'data-slot': 'tags-input-control',
    type: 'text',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-invalid]': 'invalid() || null',
    '[disabled]': 'tags.disabled()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(input)': 'tags.rejected.set(false)',
    '(paste)': 'onPaste($event)',
    '(blur)': 'commit()',
  },
})
export class ScTagsInputControl {
  protected readonly tags = inject(ScTagsInput);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-tags-input-control-',
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });

  protected readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );
  /** Its text refused, or the tags invalid once touched. */
  protected readonly invalid = computed(
    () => this.tags.rejected() || (this.tags.invalid() && this.tags.touched()),
  );

  protected readonly class = computed(() =>
    cn(
      'placeholder:text-muted-foreground aria-invalid:text-destructive min-w-24 flex-1 bg-transparent px-1 outline-none disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );

  constructor() {
    this.tags.ɵregister(this.element);
    inject(DestroyRef).onDestroy(() => this.tags.ɵregister(null));
  }

  /** Adds what is typed; refused, it stays — marked — to be edited. */
  commit(): void {
    const text = this.element.value;
    if (!text.trim()) return;
    const refused = this.tags.add(text);
    if (refused.length) {
      this.tags.rejected.set(true);
    } else {
      this.element.value = '';
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const empty = !this.element.value;
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (event.key === 'Enter' || event.key === this.tags.delimiter()) {
      // An empty Enter is the form's (submit); a typed one is ours.
      if (event.key === 'Enter' && empty) return;
      event.preventDefault();
      this.commit();
    } else if ((event.key === 'Backspace' || event.key === back) && empty) {
      const last = this.tags.items().length - 1;
      if (last < 0) return;
      event.preventDefault();
      this.tags.focusItem(last);
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text/plain') ?? '';
    const parts = text.split(
      new RegExp(`[\\n\\r${escape(this.tags.delimiter())}]`),
    );
    if (parts.length < 2) return;
    event.preventDefault();
    const refused = this.tags.add(
      this.element.value + parts[0],
      ...parts.slice(1),
    );
    // The refused stay, to be edited.
    this.element.value = refused.join(`${this.tags.delimiter()} `);
    this.tags.rejected.set(refused.length > 0);
  }
}

function escape(text: string): string {
  return text.replace(/[\\\]^-]/g, '\\$&');
}
