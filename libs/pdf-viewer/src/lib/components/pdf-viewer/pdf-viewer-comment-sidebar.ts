import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ScButton, ScTextarea, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';
import type { ScPdfComment } from './pdf-viewer-types';

/**
 * The document's comments. "Add" turns on the comment tool — click a page to
 * place one; each comment's number matches its marker on the page. Picking a
 * comment here shows its page; picking a marker selects it here.
 */
@Component({
  selector: 'sc-pdf-viewer-comment-sidebar',
  imports: [ScButton, ScTextarea],
  template: `
    <div class="flex items-center justify-between gap-2 border-b px-3 py-2">
      <h3 class="text-sm font-medium">
        Comments ({{ pdfViewer.comments().length }})
      </h3>
      @if (!pdfViewer.pendingComment()) {
        <button
          scButton
          size="sm"
          variant="outline"
          [attr.aria-pressed]="placing()"
          (click)="pdfViewer.setEditorMode('comment')"
        >
          Add
        </button>
      }
    </div>

    @if (placing()) {
      <p class="text-muted-foreground border-b p-3 text-sm" role="status">
        Click on a page to place your comment.
      </p>
    }

    @if (pdfViewer.pendingComment(); as pending) {
      <form class="grid gap-2 border-b p-3" (submit)="submitComment($event)">
        <textarea
          #newComment
          scTextarea
          rows="3"
          [attr.aria-label]="'Comment on page ' + pending.pageNumber"
          placeholder="Add a comment…"
          [value]="newText()"
          (input)="newText.set($any($event.target).value)"
          (keydown.escape)="cancelAdd()"
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

    <ol class="flex-1 overflow-y-auto">
      @for (
        comment of pdfViewer.comments();
        track comment.id;
        let index = $index
      ) {
        <li
          class="grid gap-1 border-b p-3"
          [class.bg-accent]="comment.id === pdfViewer.activeCommentId()"
          [attr.data-comment-id]="comment.id"
        >
          <div class="flex items-center justify-between gap-2">
            <button
              scButton
              variant="link"
              size="xs"
              class="h-auto px-0"
              (click)="pdfViewer.showComment(comment.id)"
            >
              <span
                class="bg-primary text-primary-foreground grid size-5 place-items-center rounded-full text-[0.65rem]"
                aria-hidden="true"
              >
                {{ index + 1 }}
              </span>
              Page {{ comment.pageNumber }}
            </button>
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
        @if (!pdfViewer.pendingComment() && !placing()) {
          <li class="text-muted-foreground p-4 text-center text-sm">
            No comments yet.
          </li>
        }
      }
    </ol>
  `,
  host: {
    'data-slot': 'pdf-viewer-comment-sidebar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerCommentSidebar {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex h-full flex-col', this.classInput()),
  );

  private readonly newCommentRef =
    viewChild<ElementRef<HTMLTextAreaElement>>('newComment');

  protected readonly placing = computed(
    () => this.pdfViewer.editorMode() === 'comment',
  );
  readonly newText = signal('');
  readonly editingId = signal<string | null>(null);
  readonly editText = signal('');

  constructor() {
    // A comment was placed on a page: write it.
    effect(() => this.newCommentRef()?.nativeElement.focus());

    // A comment was picked (here or on the page): bring it into view.
    effect(() => {
      const id = this.pdfViewer.activeCommentId();
      if (!id) return;
      untracked(() =>
        requestAnimationFrame(() =>
          this.host.nativeElement
            .querySelector(`[data-comment-id="${id}"]`)
            ?.scrollIntoView({ block: 'nearest' }),
        ),
      );
    });
  }

  protected submitComment(event: Event): void {
    event.preventDefault();
    const text = this.newText().trim();
    if (!text) return;
    this.pdfViewer.postComment(text);
    this.newText.set('');
  }

  protected cancelAdd(): void {
    this.newText.set('');
    this.pdfViewer.cancelComment();
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
