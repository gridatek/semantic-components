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
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxMultiple,
  ScComboboxPopup,
  ScComboboxPortal,
  ScDatePicker,
  ScDatePickerTrigger,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputTrigger,
  ScFrame,
  ScInput,
  ScInputButton,
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
  ScTextarea,
  ScToaster,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
  injectFormatDate,
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

/** Blog Create and Blog Edit: one form, a post's or a new one. */
@Component({
  selector: 'app-blog-edit-page',
  imports: [
    ScInputButton,
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
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputTrigger,
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
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxMultiple,
    ScComboboxPopup,
    ScComboboxPortal,
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
            <h2 i18n="@@blog.edit.generalDetails" scCardTitle>
              General Details
            </h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label i18n="@@blog.edit.title" scLabel>Title</label>
                <input
                  i18n-placeholder="@@blog.edit.postTitle"
                  scInput
                  placeholder="Post title"
                  [formField]="postForm.title"
                />
              </div>
              <div scField>
                <label i18n="@@blog.edit.excerpt" scLabel>Excerpt</label>
                <textarea
                  scTextarea
                  rows="2"
                  [formField]="postForm.excerpt"
                ></textarea>
                <p i18n="@@blog.edit.aSentenceOrTwoShown" scFieldDescription>
                  A sentence or two, shown in the listing.
                </p>
              </div>
              <div
                scEditor
                [formField]="postForm.body"
                class="flex flex-col gap-2"
              >
                <div
                  i18n-aria-label="@@blog.edit.formatting"
                  scToolbar
                  aria-label="Formatting"
                  class="w-full flex-wrap"
                >
                  <div scToolbarWidgetGroup>
                    <button scToolbarWidget scToggle scEditorCommand="bold">
                      <svg siBoldIcon></svg
                      ><span i18n="@@blog.edit.bold" class="sr-only">Bold</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="italic">
                      <svg siItalicIcon></svg
                      ><span i18n="@@blog.edit.italic" class="sr-only"
                        >Italic</span
                      >
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="underline"
                    >
                      <svg siUnderlineIcon></svg
                      ><span i18n="@@blog.edit.underline" class="sr-only"
                        >Underline</span
                      >
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="strikethrough"
                    >
                      <svg siStrikethroughIcon></svg
                      ><span i18n="@@blog.edit.strikethrough" class="sr-only"
                        >Strikethrough</span
                      >
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
                      ><span i18n="@@blog.edit.bulletedList" class="sr-only"
                        >Bulleted list</span
                      >
                    </button>
                    <button
                      scToolbarWidget
                      scToggle
                      scEditorCommand="ordered-list"
                    >
                      <svg siListOrderedIcon></svg
                      ><span i18n="@@blog.edit.numberedList" class="sr-only"
                        >Numbered list</span
                      >
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="quote">
                      <svg siQuoteIcon></svg
                      ><span i18n="@@blog.edit.quote" class="sr-only"
                        >Quote</span
                      >
                    </button>
                  </div>
                  <div scToolbarSeparator></div>
                  <div scToolbarWidgetGroup>
                    <button scToolbarWidget scToggle scEditorCommand="undo">
                      <svg siUndoIcon></svg
                      ><span i18n="@@blog.edit.undo" class="sr-only">Undo</span>
                    </button>
                    <button scToolbarWidget scToggle scEditorCommand="redo">
                      <svg siRedoIcon></svg
                      ><span i18n="@@blog.edit.redo" class="sr-only">Redo</span>
                    </button>
                  </div>
                </div>
                <div
                  i18n-placeholder="@@blog.edit.writeThePost"
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
            <h2 i18n="@@blog.edit.medias" scCardTitle>Medias</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4">
            @if (cover(); as cover) {
              <div
                scFrame
                class="bg-muted relative aspect-video max-w-md overflow-hidden"
              >
                @if (cover.startsWith('blob:')) {
                  <img
                    i18n-alt="@@blog.edit.theChosenCover"
                    [src]="cover"
                    alt="The chosen cover"
                    class="size-full object-cover"
                  />
                } @else {
                  <img
                    i18n-alt="@@blog.edit.theCurrentCover"
                    [ngSrc]="cover"
                    alt="The current cover"
                    fill
                    class="object-cover"
                  />
                }
              </div>
            }
            <div scFileInput accept="image/*" (valueChange)="choose($event)">
              <div scFileInputDropzone>
                <svg siUploadIcon></svg>
                <p i18n="@@blog.edit.dropTheCoverImageHere">
                  Drop the cover image here
                </p>
                <button scFileInputTrigger size="sm">
                  <span i18n="@@blog.edit.browseFiles">Browse files</span>
                  <span i18n="@@blog.edit.coverImage" class="sr-only">
                    Cover image
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 i18n="@@blog.edit.status" scCardTitle>Status</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4">
            <div
              i18n-aria-label="@@blog.edit.status"
              scRadioGroup
              [formField]="postForm.status"
              aria-label="Status"
            >
              <label scField orientation="horizontal">
                <input scRadio value="published" />
                <ng-container i18n="@@blog.edit.published"
                  >Published</ng-container
                >
              </label>
              <label scField orientation="horizontal">
                <input scRadio value="draft" />
                <ng-container i18n="@@blog.edit.draft">Draft</ng-container>
              </label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="postForm.featured" />
              <label i18n="@@blog.edit.featured" scLabel>Featured</label>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 i18n="@@blog.edit.categoryTags" scCardTitle>
              Category &amp; Tags
            </h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <div
                  scSelect
                  [formField]="postForm.category"
                  [items]="categories"
                >
                  <div i18n="@@blog.edit.category" scSelectLabel>Category</div>
                  <div scSelectTrigger class="w-full">
                    <span
                      i18n-placeholder="@@blog.edit.chooseACategory"
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
                <label i18n="@@blog.edit.tags" scLabel>Tags</label>
                <!-- Tags: the Combobox recipe (docs: Recipes, Tags Input). -->
                <div
                  scCombobox
                  multiple
                  autoHighlight
                  #tagBox="scCombobox"
                  [(value)]="tags"
                >
                  <div scComboboxChips>
                    @for (tag of tags(); track tag) {
                      <span scComboboxChip [value]="tag">
                        {{ tag }}
                        <button scComboboxChipRemove>
                          <svg siXIcon></svg>
                          <span i18n="@@blog.edit.remove" class="sr-only"
                            >Remove {{ tag }}</span
                          >
                        </button>
                      </span>
                    }
                    <input
                      i18n-placeholder="@@blog.edit.addATag"
                      scComboboxInput
                      placeholder="Add a tag"
                      (beforeinput)="addTagOnComma($event, tagBox)"
                    />
                  </div>
                  <ng-template scComboboxPortal>
                    <div scComboboxPopup>
                      <div
                        i18n-aria-label="@@blog.edit.tags"
                        scComboboxList
                        aria-label="Tags"
                      >
                        @if (typedTag(tagBox.query()); as text) {
                          <div scComboboxItem [value]="text" [label]="text">
                            <span i18n="@@blog.edit.addTag"
                              >Add “{{ text }}”</span
                            >
                          </div>
                        }
                      </div>
                    </div>
                  </ng-template>
                </div>
                <p i18n="@@blog.edit.pressEnterOrTypeA" scFieldDescription>
                  Press Enter or type a comma to add one.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 i18n="@@blog.edit.postDate" scCardTitle>Post Date</h2>
          </div>
          <div scCardBody>
            <div scDatePicker #dp="scDatePicker" [(value)]="date">
              <div
                scPopoverProvider
                [origin]="trigger.overlayOrigin"
                alignment="start"
              >
                <button
                  scInputButton
                  scDatePickerTrigger
                  #trigger="scDatePickerTrigger"
                  class="w-full"
                >
                  <svg siCalendarIcon></svg>
                  <span>{{ formatDate(date()) || t.pickADate }}</span>
                </button>
                <ng-template scPopoverPortal>
                  <div
                    i18n-aria-label="@@blog.edit.chooseADate"
                    scPopover
                    class="w-auto p-0"
                    aria-label="Choose a date"
                  >
                    <div
                      i18n-aria-label="@@blog.edit.chooseADate"
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
                          <span i18n="@@blog.edit.previousMonth" class="sr-only"
                            >Previous month</span
                          >
                        </button>
                        <button scCalendarNext>
                          <svg siChevronRightIcon></svg>
                          <span i18n="@@blog.edit.nextMonth" class="sr-only"
                            >Next month</span
                          >
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
          <a
            i18n="@@blog.edit.cancel"
            scLink
            variant="outline"
            routerLink="/apps/blog/manage-blog"
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
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    blogEdit: $localize`:@@blog.edit.blogEdit:Blog Edit`,
    blogCreate: $localize`:@@blog.edit.blogCreate:Blog Create`,
    blog: $localize`:@@blog.edit.blog:Blog`,
    edit: $localize`:@@blog.edit.edit:Edit`,
    create: $localize`:@@blog.edit.create:Create`,
    pickADate: $localize`:@@blog.edit.pickADate:Pick a date`,
    saveChanges: $localize`:@@blog.edit.saveChanges:Save Changes`,
    createPost: $localize`:@@blog.edit.createPost:Create Post`,
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

  /** What is typed, as a new tag: not empty, not a tag already. */
  private typedTag(query: string): string | null {
    const text = query.trim();
    return text && !this.tags().includes(text) ? text : null;
  }

  /** A comma adds the tag typed, as Enter on the Add item does. */
  private addTagOnComma(
    event: InputEvent,
    box: ScComboboxMultiple<string>,
  ): void {
    // On the character typed (beforeinput: after the combobox's own keys,
    // and phone keyboards too).
    if (event.data !== ',') return;
    event.preventDefault();
    const text = this.typedTag(box.query());
    // As a pick: the tag added, the text cleared.
    if (text) box.pick([...box.selected(), text]);
  }
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
        title: $localize`:@@blog.edit.someFieldsAreMissing:Some fields are missing`,
        description: $localize`:@@blog.edit.aPostNeedsATitle:A post needs a title and a category.`,
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
      title: existing
        ? $localize`:@@blog.edit.postSaved:Post saved`
        : $localize`:@@blog.edit.postCreated:Post created`,
    });
    void this.router.navigate(['/apps/blog/detail', saved.slug]);
  }
}
