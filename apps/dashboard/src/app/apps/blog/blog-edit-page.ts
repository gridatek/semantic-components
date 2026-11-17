import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScDatePicker,
  ScDatePickerTrigger,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadInput,
  ScFileUploadTrigger,
  ScFrame,
  ScInput,
  ScLabel,
  ScLink,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScRadio,
  ScRadioGroup,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScSwitch,
  ScTagsInput,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemRemove,
  ScTextarea,
  ScToaster,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorCommand,
  ScEditorContent,
} from '@semantic-components/ui/editor';
import {
  SiBoldIcon,
  SiCalendarIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiItalicIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiQuoteIcon,
  SiRedoIcon,
  SiStrikethroughIcon,
  SiUnderlineIcon,
  SiUndoIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import {
  BLOG_CATEGORIES,
  type BlogPost,
  type BlogStatus,
} from '../../data/blog';
import { PageHeader } from '../../layout/page-header';
import { today } from '../../shared/format';
import { BlogStore } from '../../shared/stores';

const EMPTY_BODY = '<p></p>';

/** Blog Create and Blog Edit: one form, a post's or a new one (shadcndashboard's blogadd / blogedit). */
@Component({
  selector: 'app-blog-edit-page',
  imports: [
    FormField,
    NgOptimizedImage,
    RouterLink,
    ScButton,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScDatePicker,
    ScDatePickerTrigger,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadInput,
    ScFileUploadTrigger,
    ScFrame,
    ScInput,
    ScLabel,
    ScLink,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScRadio,
    ScRadioGroup,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScSwitch,
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemRemove,
    ScTextarea,
    ScToggle,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScEditor,
    ScEditorCommand,
    ScEditorContent,
    SiBoldIcon,
    SiCalendarIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiItalicIcon,
    SiListIcon,
    SiListOrderedIcon,
    SiQuoteIcon,
    SiRedoIcon,
    SiStrikethroughIcon,
    SiUnderlineIcon,
    SiUndoIcon,
    SiUploadIcon,
    SiXIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      [title]="post() ? 'Blog Edit' : 'Blog Create'"
      [trail]="[
        { label: 'Blog', url: '/apps/blog/post' },
        { label: post() ? 'Edit' : 'Create' },
      ]"
    />

    <form
      class="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]"
      (submit)="save($event)"
    >
      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>General Details</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label scLabel>Title</label>
                <input
                  scInput
                  placeholder="Post title"
                  [formField]="postForm.title"
                />
              </div>
              <div scField>
                <label scLabel>Excerpt</label>
                <textarea
                  scTextarea
                  rows="2"
                  [formField]="postForm.excerpt"
                ></textarea>
                <p scFieldDescription>
                  A sentence or two, shown in the listing.
                </p>
              </div>
              <div
                scEditor
                [formField]="postForm.body"
                class="flex flex-col gap-2"
              >
                <div scToolbar aria-label="Formatting" class="w-full flex-wrap">
                  <div scToolbarWidgetGroup>
                    <button scToolbarWidget scToggle scEditorCommand="bold">
                      <svg siBoldIcon></svg><span class="sr-only">Bold</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="italic">
                      <svg siItalicIcon></svg
                      ><span class="sr-only">Italic</span>
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="underline"
                    >
                      <svg siUnderlineIcon></svg
                      ><span class="sr-only">Underline</span>
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="strikethrough"
                    >
                      <svg siStrikethroughIcon></svg
                      ><span class="sr-only">Strikethrough</span>
                    </button>
                  </div>
                  <div scToolbarSeparator></div>
                  <div scToolbarWidgetGroup>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="bullet-list"
                    >
                      <svg siListIcon></svg
                      ><span class="sr-only">Bulleted list</span>
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="ordered-list"
                    >
                      <svg siListOrderedIcon></svg
                      ><span class="sr-only">Numbered list</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="quote">
                      <svg siQuoteIcon></svg><span class="sr-only">Quote</span>
                    </button>
                  </div>
                  <div scToolbarSeparator></div>
                  <div scToolbarWidgetGroup>
                    <button scToolbarWidget scToggle scEditorCommand="undo">
                      <svg siUndoIcon></svg><span class="sr-only">Undo</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="redo">
                      <svg siRedoIcon></svg><span class="sr-only">Redo</span>
                    </button>
                  </div>
                </div>
                <div
                  scFrame
                  scEditorContent
                  ariaLabel="Content"
                  placeholder="Write the post…"
                  class="min-h-72"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Medias</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4">
            @if (cover(); as cover) {
              <div
                scFrame
                class="bg-muted relative aspect-video max-w-md overflow-hidden"
              >
                @if (cover.startsWith('blob:')) {
                  <img
                    [src]="cover"
                    alt="The chosen cover"
                    class="size-full object-cover"
                  />
                } @else {
                  <img
                    [ngSrc]="cover"
                    alt="The current cover"
                    fill
                    class="object-cover"
                  />
                }
              </div>
            }
            <div
              scFileUpload
              #upload="scFileUpload"
              accept="image/*"
              (valueChange)="choose($event)"
            >
              <input scFileUploadInput aria-label="Cover image" />
              <div scFileUploadDropzone>
                <svg siUploadIcon></svg>
                <p>Drop the cover image here</p>
                <button scFileUploadTrigger size="sm">Browse files</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Status</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4">
            <div scRadioGroup [formField]="postForm.status" aria-label="Status">
              <label scField orientation="horizontal">
                <input scRadio value="published" />
                Published
              </label>
              <label scField orientation="horizontal">
                <input scRadio value="draft" />
                Draft
              </label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="postForm.featured" />
              <label scLabel>Featured</label>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Category &amp; Tags</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <div
                  scSelect
                  [formField]="postForm.category"
                  [items]="categories"
                >
                  <div scSelectLabel>Category</div>
                  <div scSelectTrigger class="w-full">
                    <span scSelectValue placeholder="Choose a category"></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </div>
                  <ng-template scSelectPortal>
                    <div scSelectPopup>
                      <div scSelectList>
                        <div scSelectGroup>
                          @for (item of categories; track item.value) {
                            <div scSelectItem [value]="item.value">
                              <span scSelectItemText>{{ item.label }}</span>
                              <span scSelectItemIndicator
                                ><svg siCheckIcon></svg
                              ></span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scField>
                <label scLabel>Tags</label>
                <div scTagsInput [(value)]="tags">
                  @for (tag of tags(); track $index) {
                    <span scTagsInputItem>
                      <span>{{ tag }}</span>
                      <button scTagsInputItemRemove>
                        <svg siXIcon></svg>
                        <span class="sr-only">Remove {{ tag }}</span>
                      </button>
                    </span>
                  }
                  <input scTagsInputControl placeholder="Add a tag" />
                </div>
                <p scFieldDescription>
                  Press Enter or type a comma to add one.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Post Date</h2>
          </div>
          <div scCardBody>
            <div scDatePicker #dp="scDatePicker" [(value)]="date">
              <div
                scPopoverProvider
                [origin]="trigger.overlayOrigin"
                alignment="start"
              >
                <button
                  scDatePickerTrigger
                  #trigger="scDatePickerTrigger"
                  class="w-full"
                >
                  <svg siCalendarIcon></svg>
                  <span>{{ dp.text() || 'Pick a date' }}</span>
                </button>
                <ng-template scPopoverPortal>
                  <div scPopover class="w-auto p-0" aria-label="Choose a date">
                    <div
                      scCalendar
                      initialFocus
                      aria-label="Choose a date"
                      [mode]="dp.mode()"
                      [value]="dp.draft()"
                      (valueChange)="dp.pick($event)"
                    >
                      <div scCalendarHeader>
                        <button scCalendarPrevious>
                          <svg siChevronLeftIcon></svg>
                          <span class="sr-only">Previous month</span>
                        </button>
                        <button scCalendarNext>
                          <svg siChevronRightIcon></svg>
                          <span class="sr-only">Next month</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <a scLink variant="outline" routerLink="/apps/blog/manage-blog"
            >Cancel</a
          >
          <button scButton type="submit">
            {{ post() ? 'Save Changes' : 'Create Post' }}
          </button>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BlogEditPage {
  private readonly store = inject(BlogStore);
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);

  /** From the route (:id); none: a new post. */
  readonly id = input<string>();

  protected readonly post = computed(() => {
    const id = this.id();
    return id ? this.store.byId(id) : undefined;
  });

  protected readonly categories = BLOG_CATEGORIES.map((value) => ({
    value,
    label: value,
  }));

  // The form: the post's values, or a new post's.
  private readonly model = linkedSignal(() => {
    const post = this.post();
    return {
      title: post?.title ?? '',
      excerpt: post?.excerpt ?? '',
      body: post?.body ?? EMPTY_BODY,
      category: post?.category ?? '',
      status: (post?.status ?? 'draft') as BlogStatus,
      featured: post?.featured ?? false,
    };
  });
  protected readonly postForm = form(this.model, (path) => {
    required(path.title);
    required(path.category);
  });
  protected readonly tags = linkedSignal<string[]>(() => [
    ...(this.post()?.tags ?? []),
  ]);
  protected readonly date = linkedSignal<ScCalendarValue>(() =>
    Temporal.PlainDate.from(this.post()?.date ?? today()),
  );
  protected readonly cover = linkedSignal<string | null>(
    () => this.post()?.cover ?? null,
  );

  protected choose(files: File[]): void {
    const file = files[0];
    // A preview of the chosen file (in the browser, from its event).
    if (file) this.cover.set(URL.createObjectURL(file));
  }

  protected save(event: Event): void {
    event.preventDefault();
    if (this.postForm().invalid()) {
      this.toaster.show({
        variant: 'error',
        title: 'Some fields are missing',
        description: 'A post needs a title and a category.',
      });
      return;
    }
    const value = this.model();
    const date = this.date();
    const existing = this.post();
    const saved = this.store.save({
      id: existing?.id,
      title: value.title,
      excerpt: value.excerpt,
      body: value.body,
      category: value.category,
      status: value.status,
      featured: value.featured,
      tags: this.tags(),
      date: date instanceof Temporal.PlainDate ? date.toString() : today(),
      cover: this.cover() ?? 'images/blog/blog-img1.png',
      views: existing?.views ?? 0,
      shares: existing?.shares ?? 0,
      author: existing?.author ?? {
        name: 'Mathew Anderson',
        avatar: 'images/profile/user-1.png',
      },
      comments: existing?.comments ?? [],
    } satisfies Omit<BlogPost, 'id' | 'slug'> & { id?: string });
    this.toaster.show({
      variant: 'success',
      title: existing ? 'Post saved' : 'Post created',
    });
    void this.router.navigate(['/apps/blog/detail', saved.slug]);
  }
}
