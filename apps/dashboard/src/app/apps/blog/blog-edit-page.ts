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
      [title]="post() ? t.blogEdit : t.blogCreate"
      [trail]="[
        { label: t.blog, url: '/apps/blog/post' },
        { label: post() ? t.edit : t.create },
      ]"
    />

    <form
      class="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]"
      (submit)="save($event)"
    >
      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>General Details</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label i18n scLabel>Title</label>
                <input
                  i18n-placeholder
                  scInput
                  placeholder="Post title"
                  [formField]="postForm.title"
                />
              </div>
              <div scField>
                <label i18n scLabel>Excerpt</label>
                <textarea
                  scTextarea
                  rows="2"
                  [formField]="postForm.excerpt"
                ></textarea>
                <p i18n scFieldDescription>
                  A sentence or two, shown in the listing.
                </p>
              </div>
              <div
                scEditor
                [formField]="postForm.body"
                class="flex flex-col gap-2"
              >
                <div
                  i18n-aria-label
                  scToolbar
                  aria-label="Formatting"
                  class="w-full flex-wrap"
                >
                  <div scToolbarWidgetGroup>
                    <button scToolbarWidget scToggle scEditorCommand="bold">
                      <svg siBoldIcon></svg
                      ><span i18n class="sr-only">Bold</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="italic">
                      <svg siItalicIcon></svg
                      ><span i18n class="sr-only">Italic</span>
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="underline"
                    >
                      <svg siUnderlineIcon></svg
                      ><span i18n class="sr-only">Underline</span>
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="strikethrough"
                    >
                      <svg siStrikethroughIcon></svg
                      ><span i18n class="sr-only">Strikethrough</span>
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
                      ><span i18n class="sr-only">Bulleted list</span>
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="ordered-list"
                    >
                      <svg siListOrderedIcon></svg
                      ><span i18n class="sr-only">Numbered list</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="quote">
                      <svg siQuoteIcon></svg
                      ><span i18n class="sr-only">Quote</span>
                    </button>
                  </div>
                  <div scToolbarSeparator></div>
                  <div scToolbarWidgetGroup>
                    <button scToolbarWidget scToggle scEditorCommand="undo">
                      <svg siUndoIcon></svg
                      ><span i18n class="sr-only">Undo</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="redo">
                      <svg siRedoIcon></svg
                      ><span i18n class="sr-only">Redo</span>
                    </button>
                  </div>
                </div>
                <div
                  i18n-placeholder
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
            <h2 i18n scCardTitle>Medias</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4">
            @if (cover(); as cover) {
              <div
                scFrame
                class="bg-muted relative aspect-video max-w-md overflow-hidden"
              >
                @if (cover.startsWith('blob:')) {
                  <img
                    i18n-alt
                    [src]="cover"
                    alt="The chosen cover"
                    class="size-full object-cover"
                  />
                } @else {
                  <img
                    i18n-alt
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
              <input
                i18n-aria-label
                scFileUploadInput
                aria-label="Cover image"
              />
              <div scFileUploadDropzone>
                <svg siUploadIcon></svg>
                <p i18n>Drop the cover image here</p>
                <button i18n scFileUploadTrigger size="sm">Browse files</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>Status</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4">
            <div
              i18n-aria-label
              scRadioGroup
              [formField]="postForm.status"
              aria-label="Status"
            >
              <label scField orientation="horizontal">
                <input scRadio value="published" />
                <ng-container i18n>Published</ng-container>
              </label>
              <label scField orientation="horizontal">
                <input scRadio value="draft" />
                <ng-container i18n>Draft</ng-container>
              </label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="postForm.featured" />
              <label i18n scLabel>Featured</label>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>Category &amp; Tags</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <div
                  scSelect
                  [formField]="postForm.category"
                  [items]="categories"
                >
                  <div i18n scSelectLabel>Category</div>
                  <div scSelectTrigger class="w-full">
                    <span
                      i18n-placeholder
                      scSelectValue
                      placeholder="Choose a category"
                    ></span>
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
                <label i18n scLabel>Tags</label>
                <div scTagsInput [(value)]="tags">
                  @for (tag of tags(); track $index) {
                    <span scTagsInputItem>
                      <span>{{ tag }}</span>
                      <button scTagsInputItemRemove>
                        <svg siXIcon></svg>
                        <span i18n class="sr-only">Remove {{ tag }}</span>
                      </button>
                    </span>
                  }
                  <input
                    i18n-placeholder
                    scTagsInputControl
                    placeholder="Add a tag"
                  />
                </div>
                <p i18n scFieldDescription>
                  Press Enter or type a comma to add one.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>Post Date</h2>
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
                  <span>{{ dp.text() || t.pickADate }}</span>
                </button>
                <ng-template scPopoverPortal>
                  <div
                    i18n-aria-label
                    scPopover
                    class="w-auto p-0"
                    aria-label="Choose a date"
                  >
                    <div
                      i18n-aria-label
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
                          <span i18n class="sr-only">Previous month</span>
                        </button>
                        <button scCalendarNext>
                          <svg siChevronRightIcon></svg>
                          <span i18n class="sr-only">Next month</span>
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
          <a i18n scLink variant="outline" routerLink="/apps/blog/manage-blog"
            >Cancel</a
          >
          <button scButton type="submit">
            {{ post() ? t.saveChanges : t.createPost }}
          </button>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BlogEditPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    blogEdit: $localize`Blog Edit`,
    blogCreate: $localize`Blog Create`,
    blog: $localize`Blog`,
    edit: $localize`Edit`,
    create: $localize`Create`,
    pickADate: $localize`Pick a date`,
    saveChanges: $localize`Save Changes`,
    createPost: $localize`Create Post`,
  };

  private readonly store = inject(BlogStore);
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);

  /** From the route (:id); none: a new post. */
  readonly id = input<string>();

  private readonly post = computed(() => {
    const id = this.id();
    return id ? this.store.byId(id) : undefined;
  });

  private readonly categories = BLOG_CATEGORIES.map((value) => ({
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
  private readonly postForm = form(this.model, (path) => {
    required(path.title);
    required(path.category);
  });
  private readonly tags = linkedSignal<string[]>(() => [
    ...(this.post()?.tags ?? []),
  ]);
  private readonly date = linkedSignal<ScCalendarValue>(() =>
    Temporal.PlainDate.from(this.post()?.date ?? today()),
  );
  private readonly cover = linkedSignal<string | null>(
    () => this.post()?.cover ?? null,
  );

  private choose(files: File[]): void {
    const file = files[0];
    // A preview of the chosen file (in the browser, from its event).
    if (file) this.cover.set(URL.createObjectURL(file));
  }

  private save(event: Event): void {
    event.preventDefault();
    if (this.postForm().invalid()) {
      this.toaster.show({
        variant: 'error',
        title: $localize`Some fields are missing`,
        description: $localize`A post needs a title and a category.`,
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
      title: existing ? $localize`Post saved` : $localize`Post created`,
    });
    void this.router.navigate(['/apps/blog/detail', saved.slug]);
  }
}
