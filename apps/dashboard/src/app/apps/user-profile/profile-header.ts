import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScCard,
} from '@semantic-components/ui';
import { SiMapPinIcon } from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import { ME } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { count } from '../../shared/format';
import { label } from '../../shared/labels';

/**
 * The profile's header (Pro User Profile): the page title, the person, their
 * counts and the four pages as links — the current one marked.
 */
@Component({
  selector: 'app-profile-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScCard,
    SiMapPinIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      [title]="title()"
      [trail]="[
        { label: t.apps },
        { label: t.userProfile },
        { label: title() },
      ]"
    />
    <div scCard class="gap-0 overflow-hidden pt-0 pb-0">
      <div class="from-muted to-accent h-32 bg-gradient-to-r md:h-40"></div>
      <div class="flex flex-wrap items-end gap-4 px-6 pb-4">
        <span scAvatar class="ring-card -mt-10 size-24 ring-4">
          <img scAvatarImage [src]="me.avatar" alt="" />
          <span scAvatarFallback class="text-2xl">MA</span>
        </span>
        <div class="flex flex-col gap-1">
          <span class="text-lg font-semibold">{{ me.name }}</span>
          <span class="text-muted-foreground flex items-center gap-1 text-sm">
            {{ labelOf(me.role) }} · <svg siMapPinIcon class="size-3.5"></svg>
            {{ me.city }}
          </span>
        </div>
        <dl class="ms-auto flex gap-6 text-center">
          <div>
            <dt
              i18n="@@userProfile.profileHeader.posts"
              class="text-muted-foreground text-xs"
            >
              Posts
            </dt>
            <dd class="font-semibold tabular-nums">{{ countOf(938) }}</dd>
          </div>
          <div>
            <dt
              i18n="@@userProfile.profileHeader.followers"
              class="text-muted-foreground text-xs"
            >
              Followers
            </dt>
            <dd class="font-semibold tabular-nums">{{ countOf(3586) }}</dd>
          </div>
          <div>
            <dt
              i18n="@@userProfile.profileHeader.following"
              class="text-muted-foreground text-xs"
            >
              Following
            </dt>
            <dd class="font-semibold tabular-nums">{{ countOf(2659) }}</dd>
          </div>
        </dl>
      </div>
      <nav
        i18n-aria-label="@@userProfile.profileHeader.profile"
        class="flex gap-1 overflow-x-auto border-t px-4"
        aria-label="Profile"
      >
        @for (tab of tabs; track tab.url) {
          <a
            [routerLink]="tab.url"
            routerLinkActive="border-primary text-foreground"
            ariaCurrentWhenActive="page"
            class="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 border-b-2 border-transparent px-3 py-3 text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-3"
            >{{ tab.label }}</a
          >
        }
      </nav>
    </div>
  `,
  host: { '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class ProfileHeader {
  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@userProfile.profileHeader.apps:Apps`,
    userProfile: $localize`:@@userProfile.profileHeader.userProfile:User Profile`,
  };

  readonly title = input.required<string>();
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly me = ME;
  private readonly tabs = [
    {
      label: $localize`:@@userProfile.profileHeader.profile:Profile`,
      url: '/apps/user-profile/profile',
    },
    {
      label: $localize`:@@userProfile.profileHeader.followers:Followers`,
      url: '/apps/user-profile/followers',
    },
    {
      label: $localize`:@@userProfile.profileHeader.friends:Friends`,
      url: '/apps/user-profile/friends',
    },
    {
      label: $localize`:@@userProfile.profileHeader.gallery:Gallery`,
      url: '/apps/user-profile/gallery',
    },
  ];
  private readonly class = computed(() =>
    cn('flex flex-col gap-4', this.classInput()),
  );
}
