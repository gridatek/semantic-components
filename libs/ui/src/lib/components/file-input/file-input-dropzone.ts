import {
  DOCUMENT,
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScFileInput } from './file-input';
import { scDroppedFiles, scFileAccepted } from './file-input-files';

/**
 * Where files are dropped — this zone, or the whole page
 * (`target="document"`, an overlay shown while dragging) — and pasted (into
 * it, by default: put the trigger or a textarea in it). Not a control, not a
 * Tab stop: its trigger is the way in. `data-dragging` while files are over
 * it, with `data-drag-accept` or `data-drag-reject` (their types, their
 * count); text, and drags that start in the page, are left alone.
 */
@Directive({
  selector: '[scFileInputDropzone]',
  host: {
    'data-slot': 'file-input-dropzone',
    '[attr.data-dragging]': 'dragging() || null',
    '[attr.data-drag-accept]': 'dragging() && fits() ? "" : null',
    '[attr.data-drag-reject]': 'dragging() && !fits() ? "" : null',
    '[attr.data-disabled]': 'root.disabled() || null',
    '[attr.data-invalid]': 'root.showInvalid() || null',
    '[class]': 'class()',
    '(dragenter)': 'onDragOver($event, false)',
    '(dragover)': 'onDragOver($event, false)',
    '(dragleave)': 'onDragLeave($event, false)',
    '(drop)': 'onDrop($event, false)',
    '(paste)': 'onPaste($event, "self")',
  },
})
export class ScFileInputDropzone {
  private readonly root = inject(ScFileInput);
  private readonly styles = injectStyle().fileInput;
  private readonly document = inject(DOCUMENT);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Where drops are taken: on it, or anywhere on the page. */
  readonly target = input<'self' | 'document'>('self');
  /** Where pasted files are taken: in it, the page, an element, or nowhere. */
  readonly pasteTarget = input<'self' | 'document' | HTMLElement | null>(
    'self',
  );

  /** Files are dragged over it. */
  private readonly dragging = signal(false);
  /** The files dragged would all be taken. */
  private readonly fits = signal(true);
  /** A drag started in the page: not files to take. */
  private inPage = false;

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground flex flex-col items-center justify-center border border-dashed text-center transition-colors',
      'data-drag-accept:border-primary data-drag-accept:bg-accent data-drag-reject:border-destructive data-drag-reject:bg-destructive/5',
      'data-invalid:border-destructive',
      '[&>svg]:pointer-events-none [&>svg]:shrink-0',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      this.styles.dropzone,
      this.classInput(),
    ),
  );

  constructor() {
    // Drags that start in the page (text, an image, a list item).
    afterRenderEffect((onCleanup) => {
      const start = () => (this.inPage = true);
      const end = () => (this.inPage = false);
      this.document.addEventListener('dragstart', start);
      this.document.addEventListener('dragend', end);
      onCleanup(() => {
        this.document.removeEventListener('dragstart', start);
        this.document.removeEventListener('dragend', end);
      });
    });
    // The whole page: drops anywhere (but on another zone).
    afterRenderEffect((onCleanup) => {
      if (this.target() !== 'document') return;
      const over = (event: DragEvent) => this.onDragOver(event, true);
      const leave = (event: DragEvent) => this.onDragLeave(event, true);
      const drop = (event: DragEvent) => this.onDrop(event, true);
      const document = this.document;
      document.addEventListener('dragenter', over);
      document.addEventListener('dragover', over);
      document.addEventListener('dragleave', leave);
      document.addEventListener('drop', drop);
      onCleanup(() => {
        document.removeEventListener('dragenter', over);
        document.removeEventListener('dragover', over);
        document.removeEventListener('dragleave', leave);
        document.removeEventListener('drop', drop);
      });
    });
    // Pastes into the page, or into an element of yours.
    afterRenderEffect((onCleanup) => {
      const target = this.pasteTarget();
      if (target === 'self' || target === null) return;
      const into = target === 'document' ? this.document : target;
      const paste = (event: Event) =>
        this.onPaste(event as ClipboardEvent, 'other');
      into.addEventListener('paste', paste);
      onCleanup(() => into.removeEventListener('paste', paste));
    });
  }

  private takes(fromDocument: boolean): boolean {
    return (this.target() === 'document') === fromDocument;
  }

  private onDragOver(event: DragEvent, fromDocument: boolean): void {
    if (!this.takes(fromDocument) || event.defaultPrevented) return;
    if (this.root.disabled() || this.inPage || !this.hasFiles(event)) return;
    // Ours to take: not the browser's to open.
    event.preventDefault();
    const items = Array.from(event.dataTransfer?.items ?? []).filter(
      (item) => item.kind === 'file',
    );
    const accept = this.root.acceptList();
    this.fits.set(
      items.length <= this.root.room() &&
        items.every((item) => scFileAccepted({ type: item.type }, accept)),
    );
    if (event.dataTransfer)
      event.dataTransfer.dropEffect = this.fits() ? 'copy' : 'none';
    this.dragging.set(true);
  }

  private onDragLeave(event: DragEvent, fromDocument: boolean): void {
    if (!this.takes(fromDocument)) return;
    // Out of the zone (out of the window) — not into one of its children.
    const to = event.relatedTarget as Node | null;
    if (!to || (!fromDocument && !this.host.contains(to)))
      this.dragging.set(false);
  }

  private onDrop(event: DragEvent, fromDocument: boolean): void {
    if (!this.takes(fromDocument)) return;
    this.dragging.set(false);
    if (event.defaultPrevented) return;
    if (this.root.disabled() || this.inPage || !this.hasFiles(event)) return;
    event.preventDefault();
    const data = event.dataTransfer;
    if (!data) return;
    void scDroppedFiles(data).then((files) => {
      this.root.add(files, 'drop');
      this.root.touch.emit();
    });
  }

  private onPaste(event: ClipboardEvent, from: 'self' | 'other'): void {
    if ((this.pasteTarget() === 'self') !== (from === 'self')) return;
    const files = Array.from(event.clipboardData?.files ?? []);
    // Text is left to the field it goes into.
    if (!files.length || this.root.disabled()) return;
    event.preventDefault();
    this.root.add(files, 'paste');
    this.root.touch.emit();
  }

  private hasFiles(event: DragEvent): boolean {
    return !!event.dataTransfer?.types.includes('Files');
  }
}
