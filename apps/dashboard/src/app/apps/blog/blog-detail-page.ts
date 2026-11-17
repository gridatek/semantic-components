import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScField,
  ScLabel,
  ScLink,
  ScSeparator,
  ScTextarea,
} from '@semantic-components/ui';
import { ScEditorView } from '@semantic-components/ui/editor';
import {
  SiArrowLeftIcon,
  SiEyeIcon,
  SiMessageCircleIcon,
  SiPencilIcon,
  SiShare2Icon,
} from '@semantic-icons/lucide-icons';
import type { BlogComment } from '../../data/blog';
import { PageHeader } from '../../layout/page-header';
import { count, day, initials, today } from '../../shared/format';
import { BlogStore } from '../../shared/stores';

/** Blog Detail: the post, then its comments and a reply box (shadcndashboard's). */
@Component({
  selector: 'app-blog-detail-page',
  imports: [
    FormField,
    NgOptimizedImage,
    NgTemplateOutlet,
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScField,
    ScLabel,
    ScLink,
    ScSeparator,
    ScTextarea,
    ScEditorView,
    SiArrowLeftIcon,
    SiEyeIcon,
    SiMessageCircleIcon,
    SiPencilIcon,
    SiShare2Icon,
    PageHeader,
  ],
  template: `
    @if (post(); as post) {
      <app-page-header
        title="Blog Detail"
        [trail]="[
          { label: 'Blog', url: '/apps/blog/post' },
          { label: 'Detail' },
        ]"
      >
        <a scLink variant="outline" routerLink="/apps/blog/post">
          <svg siArrowLeftIcon></svg>
          Back
        </a>
        <a scLink variant="button" [routerLink]="['/apps/blog/edit', post.id]">
          <svg siPencilIcon></svg>
          Edit
        </a>
      </app-page-header>

      <article class="flex flex-col gap-4">
        <div scCard class="gap-0 overflow-hidden pt-0">
          <div class="bg-muted relative aspect-[21/9]">
            <img
              [ngSrc]="post.cover"
              alt=""
              fill
              priority
              class="object-cover"
            />
          </div>
          <div class="flex flex-col gap-6 p-6 md:p-8">
            <div class="flex flex-wrap items-center gap-3">
              <span scBadge variant="secondary">{{ post.category }}</span>
              @if (post.status === 'draft') {
                <span scBadge variant="outline">Draft</span>
              }
            </div>
            <h2 class="text-3xl leading-tight font-semibold tracking-tight">
              {{ post.title }}
            </h2>
            <div
              class="text-muted-foreground flex flex-wrap items-center gap-4 text-sm"
            >
              <span class="text-foreground flex items-center gap-2">
                <span scAvatar class="size-8">
                  <img scAvatarImage [src]="post.author.avatar" alt="" />
                  <span scAvatarFallback>{{
                    initialsOf(post.author.name)
                  }}</span>
                </span>
                {{ post.author.name }}
              </span>
              <span>{{ dayOf(post.date) }}</span>
              <span class="flex items-center gap-1.5">
                <svg siEyeIcon></svg>{{ countOf(post.views) }} views
              </span>
              <span class="flex items-center gap-1.5">
                <svg siShare2Icon></svg>{{ countOf(post.shares) }} shares
              </span>
              <span class="flex items-center gap-1.5">
                <svg siMessageCircleIcon></svg>{{ comments().length }} comments
              </span>
            </div>
            <div scSeparator></div>
            <div [scEditorView]="post.body"></div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Comments ({{ comments().length }})</h2>
          </div>
          <div scCardBody class="flex flex-col gap-6">
            <form class="flex flex-col gap-3" (submit)="addComment($event)">
              <div scField>
                <label scLabel>Add a comment</label>
                <textarea
                  scTextarea
                  rows="3"
                  [formField]="commentForm.text"
                ></textarea>
              </div>
              <button scButton type="submit" class="self-end">
                Post Comment
              </button>
            </form>
            <ul class="flex flex-col gap-6">
              @for (comment of comments(); track comment.id) {
                <li class="flex flex-col gap-4">
                  <ng-container
                    [ngTemplateOutlet]="commentTpl"
                    [ngTemplateOutletContext]="{ $implicit: comment }"
                  />
                  @if (comment.replies.length) {
                    <ul class="ms-12 flex flex-col gap-4 border-s ps-4">
                      @for (reply of comment.replies; track reply.id) {
                        <li>
                          <ng-container
                            [ngTemplateOutlet]="commentTpl"
                            [ngTemplateOutletContext]="{ $implicit: reply }"
                          />
                        </li>
                      }
                    </ul>
                  }
                </li>
              }
            </ul>
          </div>
        </div>
      </article>

      <ng-template #commentTpl let-comment>
        <div class="flex gap-3">
          <span scAvatar class="size-9">
            <img scAvatarImage [src]="comment.author.avatar" alt="" />
            <span scAvatarFallback>{{ initialsOf(comment.author.name) }}</span>
          </span>
          <div class="flex flex-col gap-1">
            <p class="text-sm">
              <span class="font-medium">{{ comment.author.name }}</span>
              <span class="text-muted-foreground">
                · {{ dayOf(comment.date) }}</span
              >
            </p>
            <p class="text-sm">{{ comment.text }}</p>
          </div>
        </div>
      </ng-template>
    } @else {
      <app-page-header
        title="Blog Detail"
        [trail]="[
          { label: 'Blog', url: '/apps/blog/post' },
          { label: 'Detail' },
        ]"
      />
      <div scEmpty>
        <div scEmptyHeader>
          <h2 scEmptyTitle>Post not found</h2>
          <div scEmptyDescription>It may have been deleted.</div>
        </div>
        <a scLink variant="outline" routerLink="/apps/blog/post"
          >Back to the blog</a
        >
      </div>
    }
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailPage {
  private readonly store = inject(BlogStore);
  /** From the route (:slug). */
  readonly slug = input('');

  protected readonly post = computed(() => this.store.bySlug(this.slug()));
  /** Its comments, the ones added here first. */
  protected readonly comments = linkedSignal<readonly BlogComment[]>(
    () => this.post()?.comments ?? [],
  );

  private readonly draft = signal({ text: '' });
  protected readonly commentForm = form(this.draft, (path) => {
    required(path.text);
  });

  protected readonly initialsOf = initials;
  protected readonly dayOf = day;
  protected readonly countOf = count;

  protected addComment(event: Event): void {
    event.preventDefault();
    if (this.commentForm().invalid()) return;
    const comment: BlogComment = {
      id: `new-${this.comments().length + 1}`,
      author: { name: 'Mathew Anderson', avatar: 'images/profile/user-1.png' },
      date: today(),
      text: this.draft().text,
      replies: [],
    };
    this.comments.update((comments) => [comment, ...comments]);
    this.draft.set({ text: '' });
  }
}
