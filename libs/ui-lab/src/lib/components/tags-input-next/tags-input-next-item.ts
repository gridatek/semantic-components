import {
  Directive,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { badgeVariants, cn } from '@semantic-components/ui';
import { ScTagsInputNext } from './tags-input-next';

/**
 * A tag: reached from the field by the keyboard, not by Tab. ← → between
 * tags (past the last, the field), Home, End; Delete or Backspace removes
 * it; Escape goes back to the field.
 */
@Directive({
  selector: '[scTagsInputNextItem]',
  exportAs: 'scTagsInputNextItem',
  host: {
    'data-slot': 'tags-input-item',
    '[attr.tabindex]': 'tags.disabled() ? null : -1',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScTagsInputNextItem {
  private readonly tags = inject(forwardRef(() => ScTagsInputNext));
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its place among the tags. */
  readonly index = computed(() => this.tags.items().indexOf(this));

  protected readonly class = computed(() =>
    cn(
      badgeVariants({ variant: 'secondary' }),
      'max-w-48 gap-0.5 pe-0.5 outline-none [&>span]:truncate',
      // Focused: inverted — the field's own ring is around it already.
      'focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:ring-0',
      this.classInput(),
    ),
  );

  focus(): void {
    this.element.focus();
  }

  /** Removes it. */
  remove(): void {
    this.tags.removeAt(this.index());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.target !== this.element) return;
    const index = this.index();
    const last = this.tags.items().length - 1;
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const key =
      rtl && event.key === 'ArrowLeft'
        ? 'ArrowRight'
        : rtl && event.key === 'ArrowRight'
          ? 'ArrowLeft'
          : event.key;
    switch (key) {
      case 'ArrowLeft':
        this.tags.focusItem(Math.max(0, index - 1));
        break;
      case 'ArrowRight':
        if (index < last) this.tags.focusItem(index + 1);
        else this.tags.focusControl();
        break;
      case 'Home':
        this.tags.focusItem(0);
        break;
      case 'End':
      case 'Escape':
        this.tags.focusControl();
        break;
      case 'Delete':
      case 'Backspace':
        this.remove();
        break;
      default:
        return;
    }
    event.preventDefault();
  }
}
