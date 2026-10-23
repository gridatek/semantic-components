import { DOCUMENT } from '@angular/common';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils/cn/cn';
import {
  type ScSignature,
  type ScSignatureStroke,
  isTyped,
  toBlob,
  toSvg,
} from './ink';

/**
 * A signature: drawn on `scSignaturePadSurface`, or typed in
 * `scSignaturePadText`. Its value is plain data — strokes, or a name —
 * to store and give back; a `[formField]`. Export it with `toSvg()` or
 * `toBlob()`, trimmed to the ink.
 */
@Directive({
  selector: '[scSignaturePad]',
  exportAs: 'scSignaturePad',
  host: {
    'data-slot': 'signature-pad',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-empty]': 'empty() || null',
    '[class]': 'class()',
  },
})
export class ScSignaturePad implements FormValueControl<ScSignature | null> {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model<ScSignature | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Shown, not changed. */
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  /** Signed on, or left (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The pen: its colour (`currentColor` exports black) and width. */
  readonly penColor = model('currentColor');
  readonly penWidth = model(3);

  readonly empty = computed(() => this.value() === null);
  /** Neither disabled nor read-only. */
  readonly editable = computed(() => !this.disabled() && !this.readonly());
  /** Invalid once touched. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  private readonly past = signal<readonly (ScSignature | null)[]>([]);
  private readonly future = signal<readonly (ScSignature | null)[]>([]);
  readonly canUndo = computed(() => this.editable() && this.past().length > 0);
  readonly canRedo = computed(
    () => this.editable() && this.future().length > 0,
  );

  protected readonly class = computed(() => cn('block', this.classInput()));

  undo(): void {
    const past = this.past();
    if (!this.canUndo()) return;
    this.future.update((future) => [...future, this.value()]);
    this.past.set(past.slice(0, -1));
    this.value.set(past[past.length - 1] ?? null);
  }

  redo(): void {
    const future = this.future();
    if (!this.canRedo()) return;
    this.past.update((past) => [...past, this.value()]);
    this.future.set(future.slice(0, -1));
    this.value.set(future[future.length - 1] ?? null);
  }

  clear(): void {
    if (!this.editable() || this.empty()) return;
    this.commit(null);
  }

  /** The signature as an SVG document, trimmed to its ink. */
  toSvg(padding?: number): string {
    const value = this.value();
    return value ? toSvg(value, this.canvas(), padding) : '';
  }

  /** The signature as an image (PNG by default), trimmed to its ink. */
  toBlob(
    type?: string,
    options?: { scale?: number; padding?: number },
  ): Promise<Blob | null> {
    const value = this.value();
    return value
      ? toBlob(value, this.canvas(), type, options)
      : Promise.resolve(null);
  }

  /** A stroke drawn, on a surface of `width` × `height` (if the first). */
  ɵaddStroke(stroke: ScSignatureStroke, width: number, height: number): void {
    const value = this.value();
    const drawn = value && !isTyped(value) ? value : null;
    this.commit({
      width: drawn?.width ?? width,
      height: drawn?.height ?? height,
      strokes: [...(drawn?.strokes ?? []), stroke],
    });
    this.touch.emit();
  }

  /** A name typed: one step of history, however many keys. */
  ɵsetText(text: string, font: string): void {
    const value = this.value();
    const next = text.trim() ? { text, font } : null;
    if (isTyped(value) && next) {
      this.value.set(next);
    } else {
      this.commit(next);
    }
  }

  private canvas(): HTMLCanvasElement {
    return this.document.createElement('canvas');
  }

  private commit(next: ScSignature | null): void {
    this.past.update((past) => [...past, this.value()]);
    this.future.set([]);
    this.value.set(next);
  }
}
