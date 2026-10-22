import {
  Directive,
  booleanAttribute,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';

/** Why a file was kept out: not an accepted type, too large, one too many. */
export type ScFileUploadNextRejectionReason = 'type' | 'size' | 'count';

export interface ScFileUploadNextRejection {
  file: File;
  reason: ScFileUploadNextRejectionReason;
}

/**
 * Files, chosen — picked or dropped — never uploaded: its value is a
 * `File[]`, a `[formField]`. Those that break `accept`, `maxSize` or
 * `maxFiles` are kept out, and said in `rejections()` until the next pick.
 */
@Directive({
  selector: '[scFileUploadNext]',
  exportAs: 'scFileUploadNext',
  host: {
    'data-slot': 'file-upload',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScFileUploadNext implements FormValueControl<File[]> {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model<File[]>([]);
  /** Several files; without it, a new file replaces the one there. */
  readonly multiple = input(false, { transform: booleanAttribute });
  /** The types taken, as for `<input accept>`: `image/*`, `.pdf`, `text/csv`. */
  readonly accept = input('');
  /** The largest file taken, in bytes. */
  readonly maxSize = input<number | null>(null);
  /** The most files, in all (with `multiple`). */
  readonly maxFiles = input<number | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** The picker closed (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The files kept out of the last pick or drop, and why. */
  readonly rejections = signal<ScFileUploadNextRejection[]>([]);
  /** Invalid, once touched: shown. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  protected readonly class = computed(() =>
    cn('flex flex-col gap-3', this.classInput()),
  );

  private picker: HTMLInputElement | null = null;

  /** The native picker (`scFileUploadNextInput`): opened by `browse()`. */
  ɵregister(picker: HTMLInputElement | null): void {
    this.picker = picker;
  }

  /** Opens the file picker. */
  browse(): void {
    if (!this.disabled()) this.picker?.click();
  }

  /** Adds files, as picked or dropped: those that break a rule are kept out. */
  add(files: Iterable<File>): void {
    if (this.disabled()) return;
    const room = this.multiple()
      ? (this.maxFiles() ?? Infinity) - this.value().length
      : 1;
    const accepted: File[] = [];
    const rejected: ScFileUploadNextRejection[] = [];
    for (const file of files) {
      const reason = this.check(file, accepted.length < room);
      if (reason) rejected.push({ file, reason });
      else accepted.push(file);
    }
    this.rejections.set(rejected);
    if (!accepted.length) return;
    this.value.update((value) =>
      this.multiple() ? [...value, ...accepted] : accepted,
    );
  }

  remove(file: File): void {
    this.value.update((value) => value.filter((f) => f !== file));
  }

  private check(
    file: File,
    room: boolean,
  ): ScFileUploadNextRejectionReason | null {
    if (!this.takes(file)) return 'type';
    const max = this.maxSize();
    if (max !== null && file.size > max) return 'size';
    return room ? null : 'count';
  }

  /** Of a type in `accept`: an extension, `type/*`, or a type. */
  private takes(file: File): boolean {
    const accept = this.accept().trim();
    if (!accept) return true;
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return accept
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .some((entry) =>
        entry.startsWith('.')
          ? name.endsWith(entry)
          : entry.endsWith('/*')
            ? type.startsWith(entry.slice(0, -1))
            : type === entry,
      );
  }
}
