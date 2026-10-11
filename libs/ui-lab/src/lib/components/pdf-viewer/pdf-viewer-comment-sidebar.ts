import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ScButton, ScTextarea, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';
import type { ScPdfComment } from './pdf-viewer-types';

/** The document's comments: add one on the current page, edit, delete. */
@Component({
  selector: 'sc-pdf-viewer-comment-sidebar',
  imports: [ScButton, ScTextarea],
  template: `
    <div class="flex items-center justify-between gap-2 border-b px-3 py-2">
      <h3 class="text-sm font-medium">
        Comments ({{ pdfViewer.comments().length }})
      </h3>
      @if (!adding()) {
        <button scButton size="sm" variant="outline" (click)="adding.set(true)">
          Add
        </button>
      }
    </div>

    @if (adding()) {
      <form class="grid gap-2 border-b p-3" (submit)="submitComment($event)">
        <textarea
          scTextarea
          rows="3"
          [attr.aria-label]="'Comment on page ' + pdfViewer.currentPage()"
          placeholder="Add a comment…"
          [value]="newText()"
          (input)="newText.set($any($event.target).value)"
        ></textarea>
        <div class="flex justify-end gap-2">
          <button scButton size="sm" variant="ghost" (click)="cancelAdd()">
            Cancel
          </button>
          <button
            scButton
            size="sm"
            type="submit"
            [disabled]="!newText().trim()"
          >
            Post
          </button>
        </div>
      </form>
    }

    <ul class="flex-1 overflow-y-auto">
      @for (comment of pdfViewer.comments(); track comment.id) {
        <li class="grid gap-1 border-b p-3">
          <div class="flex items-center justify-between gap-2">
            <span class="text-primary text-xs font-medium">
              Page {{ comment.pageNumber }}
            </span>
            <span class="text-muted-foreground text-xs">
              {{ comment.date }}
            </span>
          </div>
          @if (editingId() === comment.id) {
            <textarea
              scTextarea
              rows="2"
              aria-label="Edit comment"
              [value]="editText()"
              (input)="editText.set($any($event.target).value)"
            ></textarea>
            <div class="flex justify-end gap-2">
              <button
                scButton
                size="sm"
                variant="ghost"
                (click)="editingId.set(null)"
              >
                Cancel
              </button>
              <button scButton size="sm" (click)="saveEdit(comment.id)">
                Save
              </button>
            </div>
          } @else {
            <p class="text-sm">{{ comment.text }}</p>
            <div class="flex justify-end gap-1">
              <button
                scButton
                size="sm"
                variant="ghost"
                (click)="startEdit(comment)"
              >
                Edit
              </button>
              <button
                scButton
                size="sm"
                variant="ghost"
                class="text-destructive"
                (click)="pdfViewer.removeComment(comment.id)"
              >
                Delete
              </button>
            </div>
          }
        </li>
      } @empty {
        @if (!adding()) {
          <li class="text-muted-foreground p-4 text-center text-sm">
            No comments yet.
          </li>
        }
      }
    </ul>
  `,
  host: {
    'data-slot': 'pdf-viewer-comment-sidebar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerCommentSidebar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex h-full flex-col', this.classInput()),
  );

  readonly adding = signal(false);
  readonly newText = signal('');
  readonly editingId = signal<string | null>(null);
  readonly editText = signal('');

  protected submitComment(event: Event): void {
    event.preventDefault();
    const text = this.newText().trim();
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
    this.cancelAdd();
  }

  protected cancelAdd(): void {
    this.newText.set('');
    this.adding.set(false);
  }

  protected startEdit(comment: ScPdfComment): void {
    this.editingId.set(comment.id);
    this.editText.set(comment.text);
  }

  protected saveEdit(id: string): void {
    this.pdfViewer.updateComment(id, this.editText());
    this.editingId.set(null);
  }
}
