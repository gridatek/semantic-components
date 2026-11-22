import {
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { cn } from 'cn';
import { ScFileInput } from './file-input';
import type { ScFileInputReason } from './file-input-files';

/**
 * The chosen files: a list of `scFileInputItem`, one Tab stop — the arrows,
 * Home and End move between them, Delete or Backspace removes the one
 * focused (focus on to the next). Name it.
 */
@Directive({
  selector: 'ul[scFileInputList]',
  host: {
    'data-slot': 'file-input-list',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScFileInputList {
  private readonly root = inject(ScFileInput);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The file that is the Tab stop: the one focused last, or the first. */
  readonly active = linkedSignal<readonly File[], File | null>({
    source: this.root.value,
    computation: (files, previous) =>
      previous?.value && files.includes(previous.value)
        ? previous.value
        : (files[0] ?? null),
  });

  private readonly class = computed(() => cn('grid gap-2', this.classInput()));

  /** The file removed; focus on to the next one, the one before, or the trigger. */
  remove(file: File, reason: ScFileInputReason): void {
    const files = this.root.value();
    const index = files.indexOf(file);
    const focused = this.host.contains(this.host.ownerDocument.activeElement);
    if (!this.root.remove(file, reason)) return;
    const next = files[index + 1] ?? files[index - 1] ?? null;
    this.active.set(next);
    if (!focused) return;
    if (next) this.focusFile(next, index);
    else this.root.focus();
  }

  private onKeydown(event: KeyboardEvent): void {
    const files = this.root.value();
    const item = (event.target as Element).closest<HTMLElement>(
      '[data-slot=file-input-item]',
    );
    if (!item || item !== event.target || !files.length) return;
    const index = this.items().indexOf(item);
    const file = files[index];
    if (!file) return;
    let next: number;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = Math.min(index + 1, files.length - 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = Math.max(index - 1, 0);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = files.length - 1;
        break;
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        if (!this.root.disabled()) this.remove(file, 'remove-press');
        return;
      default:
        return;
    }
    event.preventDefault();
    this.active.set(files[next]);
    this.items()[next]?.focus();
  }

  private items(): HTMLElement[] {
    return Array.from(
      this.host.querySelectorAll<HTMLElement>('[data-slot=file-input-item]'),
    );
  }

  /** Once the list shows the change: the item for this file. */
  private focusFile(file: File, index: number): void {
    afterNextRender(
      () => {
        const items = this.items();
        const at = this.root.value().indexOf(file);
        (items[at] ?? items[Math.min(index, items.length - 1)])?.focus();
      },
      { injector: this.injector },
    );
  }
}
