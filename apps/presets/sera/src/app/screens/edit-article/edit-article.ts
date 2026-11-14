import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import {
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScSeparator,
  ScToaster,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorContent,
  ScEditorView,
  provideEditor,
} from '@semantic-components/ui/editor';
import { withAlign } from '@semantic-components/ui/editor/align';
import {
  type ScEditorUploadHandler,
  ScEditorUploads,
  withImages,
} from '@semantic-components/ui/editor/images';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import { ArticleStore } from '../article-directory/article-store';
import {
  type Article,
  STATUS_LABEL,
  type Status,
  issueLabel,
} from '../article-directory/articles-data';
import { draftOf, modelOf } from './article-model';
import { ArticleSidebar } from './article-sidebar';
import { EditHeader } from './edit-header';
import { EditorToolbar } from './editor-toolbar';

/**
 * Edit Article (shadcn's sera/edit-article): the title and the text in the
 * library's editor under shadcn's toolbar, the details beside, all one form.
 * Preview shows it as readers will; Submit Draft saves it to the store.
 */
@Component({
  selector: 'app-edit-article',
  imports: [
    ArticleSidebar,
    EditHeader,
    EditorToolbar,
    FormField,
    ScDialog,
    ScDialogClose,
    ScDialogDescription,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScEditor,
    ScEditorContent,
    ScEditorUploads,
    ScEditorView,
    ScSeparator,
    SiXIcon,
  ],
  // The editor's features, for the editor and the preview.
  providers: [provideEditor(withAlign(), withImages())],
  template: `
    <div
      class="bg-muted ring-foreground/5 w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8"
    >
      <app-edit-header
        [isNew]="!article()"
        [state]="state()"
        (preview)="previewOpen.set(true)"
        (submitDraft)="submit()"
      />
      <div scSeparator class="hidden sm:block"></div>
      <div class="w-full px-(--page-gutter) py-(--gap)">
        <div
          class="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"
        >
          <section
            scEditor
            aria-label="Article"
            [formField]="articleForm.body"
            [upload]="upload"
            class="border-border/70 bg-background flex flex-col border"
          >
            <app-editor-toolbar />
            <div
              class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-10 py-10 leading-loose md:px-14 lg:py-18"
            >
              <textarea
                rows="1"
                aria-label="Title"
                placeholder="Untitled Article"
                class="font-heading placeholder:text-muted-foreground/60 field-sizing-content resize-none bg-transparent text-4xl leading-12 font-medium tracking-wide uppercase outline-none"
                [formField]="articleForm.title"
              ></textarea>
              <div
                scEditorContent
                ariaLabel="Text"
                placeholder="Start writing…"
                class="article-text max-h-none min-h-60 overflow-visible p-0"
              ></div>
            </div>
          </section>
          <app-article-sidebar
            [fields]="articleForm"
            [targetWords]="article()?.targetWords ?? 2000"
          />
        </div>
      </div>
    </div>

    <div scDialogProvider [(open)]="previewOpen">
      <ng-template scDialogPortal>
        <div scDialog class="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <p scDialogDescription>Preview · {{ byline() }}</p>
            <h2
              scDialogTitle
              class="font-heading text-3xl leading-tight tracking-wide uppercase"
            >
              {{ articleForm.title().value() || 'Untitled Article' }}
            </h2>
          </div>
          <div
            class="article-text leading-loose"
            [scEditorView]="articleForm.body().value()"
          ></div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditArticle {
  private readonly store = inject(ArticleStore);
  private readonly toaster = inject(ScToaster);
  private readonly router = inject(Router);

  /** The article being edited; null, a new one. */
  readonly article = input<Article | null>(null);

  private readonly model = linkedSignal(() => modelOf(this.article()));
  private readonly articleForm = form(this.model);
  private readonly previewOpen = signal(false);

  private readonly state = computed(() => {
    if (this.articleForm().dirty()) return 'Unsaved changes';
    return this.article() ? 'Saved' : 'New draft';
  });

  /** "By Elena Rostova · Summer 2024". */
  private readonly byline = computed(() => {
    const { author, issue } = this.model();
    return [author && `By ${author}`, issueLabel(issue)]
      .filter(Boolean)
      .join(' · ');
  });

  /**
   * The editor's images, kept in the page: a template has no server. Put
   * your upload here — it returns the image's address.
   */
  private readonly upload: ScEditorUploadHandler = (file) =>
    Promise.resolve(URL.createObjectURL(file));

  /**
   * Saves the draft — a new one or a draft goes to revision, its first draft
   * submitted — and lists it.
   */
  private submit(): void {
    const article = this.article();
    const status: Status =
      !article || article.status === 'drafting'
        ? 'in-revision'
        : article.status;
    // Submitted: a first draft, so its first two milestones are reached.
    const model = this.model();
    const milestones = {
      ...model.milestones,
      outline: true,
      'first-draft': true,
    };
    const saved = this.store.save(
      draftOf({ ...model, milestones }, article, status),
      article?.id ?? null,
    );
    this.toaster.show({
      variant: 'success',
      title: 'Draft submitted',
      description: `“${saved.title}” is ${STATUS_LABEL[status].toLowerCase()}.`,
    });
    void this.router.navigate(['/articles']);
  }
}
