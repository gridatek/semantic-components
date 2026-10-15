import { DestroyRef, Directive, inject, input, signal } from '@angular/core';
import { SC_EDITOR, type ScEditor } from '@semantic-components/editor';

/**
 * Uploads an image and resolves to its address. Report progress (0 to 1)
 * with `onProgress`; stop when `signal` aborts (the upload was cancelled).
 * Handle your own errors: a rejected upload is dropped.
 */
export type ScEditorUploadHandler = (
  file: File,
  options: { onProgress: (fraction: number) => void; signal: AbortSignal },
) => Promise<string>;

/** An image being uploaded. */
export interface ScEditorUpload {
  readonly id: number;
  readonly file: File;
  /** From 0 to 1. */
  readonly progress: number;
}

const uploadsOf = new WeakMap<ScEditor, ScEditorUploads>();

/** The uploads of an editor, when it has an `upload` handler. */
export function ɵeditorUploads(editor: ScEditor): ScEditorUploads | null {
  return uploadsOf.get(editor) ?? null;
}

/**
 * The editor's images: `[upload]` on `scEditor` uploads what is picked
 * (`scEditorImage`), dropped or pasted, then inserts it where it was, named
 * after its file. `uploads()` are the ones on their way
 * (`#images="scEditorUploads"`), `cancel(id)` stops one. Needs `withImages()`.
 */
@Directive({
  selector: '[scEditor][upload]',
  exportAs: 'scEditorUploads',
})
export class ScEditorUploads {
  private readonly editor = inject(SC_EDITOR);

  /** Uploads an image: see `ScEditorUploadHandler`. */
  readonly upload = input.required<ScEditorUploadHandler>();
  /** The image types it takes (picked, dropped or pasted). */
  readonly imageTypes = input<readonly string[]>([
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
  ]);

  /** The images being uploaded. */
  readonly uploads = signal<readonly ScEditorUpload[]>([]);
  private nextId = 0;
  private readonly controllers = new Map<number, AbortController>();

  constructor() {
    uploadsOf.set(this.editor, this);
    inject(DestroyRef).onDestroy(() => {
      for (const controller of this.controllers.values()) controller.abort();
      this.controllers.clear();
      uploadsOf.delete(this.editor);
    });
  }

  /** Uploads images and inserts them at `position` (or the selection). */
  insert(files: Iterable<File>, position?: number): void {
    const types = this.imageTypes();
    for (const file of files) {
      if (types.includes(file.type)) void this.uploadImage(file, position);
    }
  }

  /** Stops an upload; its image isn't inserted. */
  cancel(id: number): void {
    this.controllers.get(id)?.abort();
    this.remove(id);
  }

  private async uploadImage(file: File, position?: number): Promise<void> {
    if (!this.editor.editable()) return;
    const id = this.nextId++;
    const controller = new AbortController();
    this.controllers.set(id, controller);
    this.uploads.update((uploads) => [...uploads, { id, file, progress: 0 }]);
    try {
      const src = await this.upload()(file, {
        onProgress: (fraction) =>
          this.uploads.update((uploads) =>
            uploads.map((u) =>
              u.id === id
                ? { ...u, progress: Math.min(1, Math.max(0, fraction)) }
                : u,
            ),
          ),
        signal: controller.signal,
      });
      const editor = this.editor.editorInstance();
      if (!editor || controller.signal.aborted || !this.editor.editable()) {
        return;
      }
      const at = Math.min(
        position ?? editor.state.selection.to,
        editor.state.doc.content.size,
      );
      editor
        .chain()
        .insertContentAt(at, {
          type: 'image',
          // Named after its file; the consumer can change it in the HTML.
          attrs: { src, alt: file.name.replace(/\.[^.]+$/, '') },
        })
        .run();
    } catch {
      // The upload handler reports its own errors; the image is dropped.
    } finally {
      this.remove(id);
    }
  }

  private remove(id: number): void {
    this.controllers.delete(id);
    this.uploads.update((uploads) => uploads.filter((u) => u.id !== id));
  }
}
