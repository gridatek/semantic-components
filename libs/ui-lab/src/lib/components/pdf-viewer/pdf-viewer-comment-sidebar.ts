import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';
import type { PdfComment } from './pdf-viewer-types';

@Component({
  selector: 'sc-pdf-viewer-comment-sidebar',
  template: `
    <div class="flex h-full flex-col">
      <div
        class="flex items-center justify-between border-b border-[#555] px-3 py-2"
      >
        <span class="text-xs font-medium text-white">
          Comments ({{ pdfViewer.comments().length }})
        </span>
        <button
          type="button"
          class="rounded bg-[#6b9edd] px-2 py-0.5 text-xs text-white hover:bg-[#5a8ecc]"
          (click)="addingComment.set(true)"
        >
          Add
        </button>
      </div>

      <!-- Add comment form -->
      @if (addingComment()) {
        <div class="border-b border-[#555] p-3">
          <textarea
            class="w-full resize-none rounded border border-[#5a5a5a] bg-[#3d3d3d] p-2 text-xs text-[#d1d5db] outline-none focus:border-[#6b9edd]"
            rows="3"
            placeholder="Add a comment..."
            [value]="newCommentText()"
            (input)="newCommentText.set($any($event.target).value)"
          ></textarea>
          <div class="mt-2 flex justify-end gap-1">
            <button
              type="button"
              class="rounded px-2 py-1 text-xs text-[#999] hover:text-white"
              (click)="addingComment.set(false); newCommentText.set('')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded bg-[#6b9edd] px-2 py-1 text-xs text-white hover:bg-[#5a8ecc]"
              [disabled]="!newCommentText().trim()"
              (click)="submitComment()"
            >
              Post
            </button>
          </div>
        </div>
      }

      <!-- Comments list -->
      <div class="flex-1 overflow-y-auto">
        @for (comment of pdfViewer.comments(); track comment.id) {
          <div
            class="border-b border-[#444] p-3 transition-colors hover:bg-[#4a4a4a]"
          >
            <div class="mb-1 flex items-center justify-between">
              <span class="text-xs font-medium text-[#6b9edd]">
                Page {{ comment.pageNumber }}
              </span>
              <button
                type="button"
                class="text-xs text-[#999] hover:text-red-400"
                (click)="pdfViewer.removeComment(comment.id)"
              >
                Delete
              </button>
            </div>

            @if (editingId() === comment.id) {
              <textarea
                class="w-full resize-none rounded border border-[#5a5a5a] bg-[#3d3d3d] p-1 text-xs text-[#d1d5db] outline-none focus:border-[#6b9edd]"
                rows="2"
                [value]="editText()"
                (input)="editText.set($any($event.target).value)"
              ></textarea>
              <div class="mt-1 flex justify-end gap-1">
                <button
                  type="button"
                  class="text-xs text-[#999] hover:text-white"
                  (click)="editingId.set(null)"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="text-xs text-[#6b9edd] hover:text-[#8bb4ee]"
                  (click)="saveEdit(comment.id)"
                >
                  Save
                </button>
              </div>
            } @else {
              <p
                class="cursor-pointer text-xs text-[#bbb]"
                (click)="startEdit(comment)"
              >
                {{ comment.text }}
              </p>
              <span class="mt-1 block text-[10px] text-[#777]">
                {{ comment.date }}
              </span>
            }
          </div>
        }

        @if (pdfViewer.comments().length === 0 && !addingComment()) {
          <p class="p-4 text-center text-xs text-[#999]">No comments yet.</p>
        }
      </div>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-comment-sidebar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerCommentSidebar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly addingComment = signal(false);
  readonly newCommentText = signal('');
  readonly editingId = signal<string | null>(null);
  readonly editText = signal('');

  submitComment(): void {
    const text = this.newCommentText().trim();
    if (!text) return;

    this.pdfViewer.addComment({
      pageNumber: this.pdfViewer.currentPage(),
      x: 0.5,
      y: 0.5,
      text,
      author: 'User',
      date: new Date().toLocaleString(),
      color: '#FFFF00',
    });

    this.newCommentText.set('');
    this.addingComment.set(false);
  }

  startEdit(comment: PdfComment): void {
    this.editingId.set(comment.id);
    this.editText.set(comment.text);
  }

  saveEdit(id: string): void {
    this.pdfViewer.updateComment(id, this.editText());
    this.editingId.set(null);
  }
}
