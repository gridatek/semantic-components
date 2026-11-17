import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScCard,
  ScCardBody,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScToggle,
} from '@semantic-components/ui';
import {
  SiMapPinIcon,
  SiSearchIcon,
  SiUserCheckIcon,
  SiUserPlusIcon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE } from '../../data/people';
import { initials } from '../../shared/format';
import { ProfileHeader } from './profile-header';

/** Followers (Pro User Profile): who follows, followed back or not. */
@Component({
  selector: 'app-followers-page',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScCard,
    ScCardBody,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScToggle,
    SiMapPinIcon,
    SiSearchIcon,
    SiUserCheckIcon,
    SiUserPlusIcon,
    ProfileHeader,
  ],
  template: `
    <app-profile-header i18n-title title="Followers" />

    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 i18n class="text-lg font-semibold">
        Followers
        <span class="text-muted-foreground font-normal">{{
          shown().length
        }}</span>
      </h2>
      <div scInputGroup class="max-w-xs">
        <input
          i18n-aria-label
          i18n-placeholder
          scInput
          type="search"
          placeholder="Search followers"
          aria-label="Search followers"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
        />
        <div scInputGroupAddon><svg siSearchIcon></svg></div>
      </div>
    </div>

    <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      @for (person of shown(); track person.id) {
        <li class="flex">
          <div scCard class="flex-1">
            <div scCardBody class="flex items-center gap-3">
              <span scAvatar class="size-12">
                <img scAvatarImage [src]="person.avatar" alt="" />
                <span scAvatarFallback>{{ initialsOf(person.name) }}</span>
              </span>
              <div class="flex min-w-0 flex-col">
                <span class="truncate font-medium">{{ person.name }}</span>
                <span
                  class="text-muted-foreground flex items-center gap-1 text-xs"
                >
                  <svg siMapPinIcon class="size-3"></svg>{{ person.city }},
                  {{ person.country }}
                </span>
              </div>
              <button
                scToggle
                variant="outline"
                size="sm"
                class="ms-auto"
                [pressed]="following().has(person.id)"
                (pressedChange)="toggle(person.id)"
              >
                @if (following().has(person.id)) {
                  <svg siUserCheckIcon></svg>
                  <ng-container i18n>Following</ng-container>
                } @else {
                  <svg siUserPlusIcon></svg>
                  <ng-container i18n>Follow back</ng-container>
                }
              </button>
            </div>
          </div>
        </li>
      } @empty {
        <li
          i18n
          class="text-muted-foreground col-span-full p-6 text-center text-sm"
        >
          No followers match.
        </li>
      }
    </ul>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FollowersPage {
  private readonly query = signal('');
  private readonly following = signal(new Set([2, 4, 7]));
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    return PEOPLE.slice(1).filter((p) => p.name.toLowerCase().includes(q));
  });
  private readonly initialsOf = initials;

  private toggle(id: number): void {
    this.following.update((set) => {
      const next = new Set(set);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }
}
