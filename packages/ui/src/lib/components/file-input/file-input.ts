import {
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import {
  type ScFileInputChange,
  type ScFileInputReason,
  type ScFileInputRejection,
  type ScFileInputRejectionReason,
  type ScFileInputValidate,
  scAcceptList,
  scFileAccepted,
} from './file-input-files';

/**
 * Files chosen — picked, dropped, pasted — never uploaded: its value is a
 * `File[]`, a `[formField]`. Those that break `accept`, `minSize`, `maxSize`,
 * `maxFiles` or your `validate` are kept out, with every reason. It writes the
 * native picker itself (hidden); a trigger opens it, a dropzone takes drops
 * and pastes, a list shows the files. `#files="scFileInput"`: `open()`,
 * `add()`, `remove()`, `clear()`, `rejections()`, `lastChange()`.
 */
@Component({
  selector: 'div[scFileInput]',
  exportAs: 'scFileInput',
  template: `
    <ng-content />
    <input
      #picker
      type="file"
      hidden
      tabindex="-1"
      aria-hidden="true"
      [attr.aria-labelledby]="pickerLabelledBy()"
      [multiple]="multiple() || directory()"
      [attr.accept]="acceptAttribute()"
      [attr.capture]="captureAttribute()"
      [attr.webkitdirectory]="directory() ? '' : null"
      [disabled]="disabled()"
      (change)="onPicked()"
      (cancel)="touch.emit()"
    />
  `,
  host: {
    'data-slot': 'file-input',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScFileInput implements FormValueControl<File[]> {
  readonly classInput = input<string>('', { alias: 'class' });

  /** The files: two-way, or `[formField]`. */
  readonly value = model<File[]>([]);
  /** Several files, added to those there; without it, a new one replaces it. */
  readonly multiple = input(false, { transform: booleanAttribute });
  /** A whole folder picked (and `multiple`). */
  readonly directory = input(false, { transform: booleanAttribute });
  /** The camera on a phone: the back one (`environment`), the front (`user`). */
  readonly capture = input<'environment' | 'user' | boolean>(false);
  /** The types taken: `image/*`, `.pdf`, `text/csv` — a string or a list. */
  readonly accept = input<string | readonly string[]>('');
  /** The most files in all. */
  readonly maxFiles = input<number | null>(null);
  /** The smallest and largest file taken, in bytes. */
  readonly minSize = input<number | null>(null);
  readonly maxSize = input<number | null>(null);
  /** Your rule: a reason to keep a file out (`duplicate`), or nothing. */
  readonly validate = input<ScFileInputValidate | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** The picker closed, a drop, a paste (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The files kept out of the last pick, drop or paste, and why. */
  readonly rejections = signal<readonly ScFileInputRejection[]>([]);
  /** The last change — to announce it. */
  readonly lastChange = signal<ScFileInputChange | null>(null);
  /** Invalid, once touched: shown. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());
  /** `accept`, as a list. */
  readonly acceptList = computed(() => scAcceptList(this.accept()));
  /** Files that can still be added. */
  readonly room = computed(() =>
    this.multiple() || this.directory()
      ? (this.maxFiles() ?? Infinity) - this.value().length
      : 1,
  );

  /** The trigger that takes the field's id: the label opens the picker. */
  readonly ɵtrigger = signal<HTMLElement | undefined>(undefined);
  /** That trigger's id: what names the hidden picker. */
  readonly ɵtriggerId = signal<string | null>(null);
  private readonly pickerLabelledBy = this.ɵtriggerId.asReadonly();
  private readonly picker =
    viewChild.required<ElementRef<HTMLInputElement>>('picker');

  private readonly acceptAttribute = computed(
    () => this.acceptList().join(',') || null,
  );
  private readonly captureAttribute = computed(() => {
    const capture = this.capture();
    return capture === false ? null : capture === true ? '' : capture;
  });

  private readonly class = computed(() =>
    cn('flex flex-col gap-3', this.classInput()),
  );

  /** Opens the system's file picker — from a click or a key. */
  open(): boolean {
    if (this.disabled()) return false;
    this.picker().nativeElement.click();
    return true;
  }

  /** Focus on the trigger. */
  focus(): void {
    this.ɵtrigger()?.focus();
  }

  /** Files added, as picked: those that break a rule kept out. */
  add(
    files: Iterable<File>,
    reason: ScFileInputReason = 'imperative',
  ): boolean {
    if (this.disabled()) return false;
    const room = this.room();
    const accepted: File[] = [];
    const rejected: ScFileInputRejection[] = [];
    for (const file of files) {
      const reasons = this.check(file, accepted);
      if (!reasons.length && accepted.length >= room)
        reasons.push('too-many-files');
      if (reasons.length) rejected.push({ file, reasons });
      else accepted.push(file);
    }
    this.rejections.set(rejected);
    const previous = this.value();
    const single = !this.multiple() && !this.directory();
    const removed = single && accepted.length ? previous : [];
    if (accepted.length)
      this.value.set(single ? accepted : [...previous, ...accepted]);
    this.lastChange.set({ reason, added: accepted, removed, rejected });
    return accepted.length > 0;
  }

  /** A file taken out. */
  remove(file: File, reason: ScFileInputReason = 'imperative'): boolean {
    if (!this.value().includes(file)) return false;
    this.value.update((value) => value.filter((f) => f !== file));
    this.lastChange.set({ reason, added: [], removed: [file], rejected: [] });
    return true;
  }

  /** Every file taken out. */
  clear(): void {
    const removed = this.value();
    if (!removed.length) return;
    this.value.set([]);
    this.rejections.set([]);
    this.lastChange.set({
      reason: 'imperative',
      added: [],
      removed,
      rejected: [],
    });
  }

  private check(
    file: File,
    accepted: readonly File[],
  ): ScFileInputRejectionReason[] {
    const reasons: ScFileInputRejectionReason[] = [];
    if (!scFileAccepted(file, this.acceptList())) reasons.push('file-type');
    const min = this.minSize();
    const max = this.maxSize();
    if (min !== null && file.size < min) reasons.push('file-too-small');
    if (max !== null && file.size > max) reasons.push('file-too-large');
    const own = this.validate()?.(file, { accepted });
    if (own) reasons.push(own);
    return reasons;
  }

  private onPicked(): void {
    const picker = this.picker().nativeElement;
    this.add(Array.from(picker.files ?? []), 'picker');
    // Cleared: the same file can be picked again.
    picker.value = '';
    this.touch.emit();
  }
}
