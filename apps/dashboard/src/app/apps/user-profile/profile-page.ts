import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScLink,
  ScTextarea,
  ScToggle,
} from '@semantic-components/ui';
import {
  SiBriefcaseIcon,
  SiHeartIcon,
  SiMailIcon,
  SiMapPinIcon,
  SiMessageSquareIcon,
  SiPhoneIcon,
  SiSendIcon,
} from '@semantic-icons/lucide-icons';
import { ME } from '../../data/people';
import { now } from '../../shared/format';
import { ProfileHeader } from './profile-header';

interface Post {
  readonly id: number;
  readonly text: string;
  readonly when: string;
  readonly image?: string;
  readonly likes: number;
  readonly liked: boolean;
  readonly comments: number;
}

const PHOTOS = [1, 2, 3, 4, 5, 6].map(
  (n) => `images/image-ai/masonry-${n}.jpg`,
);

/** Profile (Pro User Profile): about, photos, the posts and a new one. */
@Component({
  selector: 'app-profile-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScLink,
    ScTextarea,
    ScToggle,
    SiBriefcaseIcon,
    SiHeartIcon,
    SiMailIcon,
    SiMapPinIcon,
    SiMessageSquareIcon,
    SiPhoneIcon,
    SiSendIcon,
    ProfileHeader,
  ],
  template: `
    <app-profile-header title="Profile" />

    <div class="grid gap-4 lg:grid-cols-[22rem_1fr]">
      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>About</h2>
          </div>
          <div scCardBody class="flex flex-col gap-4 text-sm">
            <p>
              Product designer in New York. I draw dashboards by day and ceramic
              bowls on weekends.
            </p>
            <ul class="flex flex-col gap-3">
              <li class="flex items-center gap-2">
                <svg siBriefcaseIcon></svg>{{ me.role }} at {{ me.company }}
              </li>
              <li class="flex items-center gap-2">
                <svg siMailIcon></svg>{{ me.email }}
              </li>
              <li class="flex items-center gap-2">
                <svg siPhoneIcon></svg>{{ me.phone }}
              </li>
              <li class="flex items-center gap-2">
                <svg siMapPinIcon></svg>{{ me.city }}, {{ me.country }}
              </li>
            </ul>
          </div>
        </div>
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Photos</h2>
          </div>
          <div scCardBody>
            <ul class="grid grid-cols-3 gap-2">
              @for (photo of photos; track photo) {
                <li class="relative aspect-square overflow-hidden rounded-md">
                  <img
                    [ngSrc]="photo"
                    fill
                    sizes="7rem"
                    alt=""
                    class="object-cover"
                  />
                </li>
              }
            </ul>
          </div>
          <div scCardFooter>
            <a scLink routerLink="/apps/user-profile/gallery" class="text-sm"
              >See all photos</a
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <form (submit)="post($event)">
          <div scCard>
            <div scCardBody class="flex flex-col gap-3">
              <textarea
                scTextarea
                rows="3"
                aria-label="Share something"
                placeholder="Share something…"
                [value]="draft()"
                (input)="draft.set($any($event.target).value)"
              ></textarea>
              <button
                scButton
                type="submit"
                class="self-end"
                [disabled]="!draft().trim()"
              >
                <svg siSendIcon></svg>
                Post
              </button>
            </div>
          </div>
        </form>

        @for (post of posts(); track post.id) {
          <article>
            <div scCard>
              <div scCardHeader class="flex items-center gap-3">
                <span scAvatar>
                  <img scAvatarImage [src]="me.avatar" alt="" />
                  <span scAvatarFallback>MA</span>
                </span>
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ me.name }}</span>
                  <span class="text-muted-foreground text-xs">{{
                    post.when
                  }}</span>
                </div>
              </div>
              <div scCardBody class="flex flex-col gap-3">
                <p class="text-sm">{{ post.text }}</p>
                @if (post.image) {
                  <div class="relative aspect-video overflow-hidden rounded-lg">
                    <img
                      [ngSrc]="post.image"
                      fill
                      sizes="(min-width: 1024px) 50vw, 90vw"
                      alt=""
                      class="object-cover"
                    />
                  </div>
                }
              </div>
              <div scCardFooter class="gap-2">
                <button
                  scToggle
                  size="sm"
                  [pressed]="post.liked"
                  (pressedChange)="like(post.id)"
                >
                  <svg siHeartIcon></svg>
                  {{ post.likes }}
                  <span class="sr-only">likes — like</span>
                </button>
                <span
                  class="text-muted-foreground flex items-center gap-1 text-sm"
                >
                  <svg siMessageSquareIcon class="size-4"></svg>
                  {{ post.comments }} <span class="sr-only">comments</span>
                </span>
              </div>
            </div>
          </article>
        }
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePage {
  private readonly me = ME;
  private readonly photos = PHOTOS;
  private readonly draft = signal('');
  private readonly posts = signal<readonly Post[]>([
    {
      id: 2,
      text: 'New dashboard screens are up — one look across forty pages, carried by the preset.',
      when: 'Apr 27, 2026',
      image: 'images/image-ai/leptop2.jpg',
      likes: 128,
      liked: true,
      comments: 14,
    },
    {
      id: 1,
      text: 'Spent the weekend glazing bowls. The blue one cracked; the rest survived.',
      when: 'Apr 20, 2026',
      likes: 64,
      liked: false,
      comments: 6,
    },
  ]);

  private post(event: Event): void {
    event.preventDefault();
    const text = this.draft().trim();
    if (!text) return;
    const when = Temporal.PlainDateTime.from(now()).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    this.posts.update((posts) => [
      { id: posts.length + 1, text, when, likes: 0, liked: false, comments: 0 },
      ...posts,
    ]);
    this.draft.set('');
  }

  private like(id: number): void {
    this.posts.update((posts) =>
      posts.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p,
      ),
    );
  }
}
