import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
} from '@semantic-components/ui';
import { SiEyeIcon, SiMessageCircleIcon } from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import type { BlogPost } from '../../data/blog';
import { count, day, initials } from '../../shared/format';
import { label } from '../../shared/labels';

/**
 * A post in the listing: its cover, category, title (the link), author and
 * figures. Featured: larger, its text over the cover.
 */
@Component({
  selector: 'app-blog-card',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    SiEyeIcon,
    SiMessageCircleIcon,
  ],
  template: `
    <article class="h-full">
      <div scCard class="relative h-full gap-0 overflow-hidden pt-0">
        <div class="bg-muted relative aspect-video">
          <img
            [ngSrc]="post().cover"
            alt=""
            fill
            [priority]="priority()"
            class="object-cover"
          />
          <span scBadge variant="secondary" class="absolute start-4 top-4">
            {{ labelOf(post().category) }}
          </span>
        </div>
        <div class="flex flex-1 flex-col gap-4 p-6">
          <div class="flex items-center gap-2">
            <span scAvatar class="size-8">
              <img scAvatarImage [src]="post().author.avatar" alt="" />
              <span scAvatarFallback>{{ initialsOf(post().author.name) }}</span>
            </span>
            <span class="text-sm">{{ post().author.name }}</span>
          </div>
          <h3 [class]="titleClass()">
            <a
              [routerLink]="['/apps/blog/detail', post().slug]"
              class="after:absolute after:inset-0 hover:underline focus-visible:underline"
              >{{ post().title }}</a
            >
          </h3>
          <div
            class="text-muted-foreground mt-auto flex flex-wrap items-center gap-4 text-sm"
          >
            <span class="flex items-center gap-1.5">
              <svg siEyeIcon></svg>
              {{ countOf(post().views)
              }}<span i18n="@@blog.card.views" class="sr-only"> views</span>
            </span>
            <span class="flex items-center gap-1.5">
              <svg siMessageCircleIcon></svg>
              {{ countOf(post().comments.length)
              }}<span i18n="@@blog.card.comments" class="sr-only">
                comments</span
              >
            </span>
            <span class="ms-auto">{{ dayOf(post().date) }}</span>
          </div>
        </div>
      </div>
    </article>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class BlogCard {
  private readonly labelOf = label;
  readonly post = input.required<BlogPost>();
  readonly featured = input(false, { transform: booleanAttribute });
  readonly priority = input(false);

  private readonly titleClass = computed(() =>
    cn(
      'leading-snug font-semibold',
      this.featured() ? 'text-xl' : 'line-clamp-2 text-base',
    ),
  );
  private readonly initialsOf = initials;
  private readonly countOf = count;
  private readonly dayOf = day;
}
