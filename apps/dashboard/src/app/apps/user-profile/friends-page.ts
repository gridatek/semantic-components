import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLink,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiMailIcon,
  SiSearchIcon,
  SiUserMinusIcon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE, type Person } from '../../data/people';
import { count, initials } from '../../shared/format';
import { label } from '../../shared/labels';
import { ProfileHeader } from './profile-header';

/** Friends (Pro User Profile): cards, a message, unfriending. */
@Component({
  selector: 'app-friends-page',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLink,
    SiMailIcon,
    SiSearchIcon,
    SiUserMinusIcon,
    ProfileHeader,
  ],
  template: `
    <app-profile-header
      i18n-title="@@userProfile.friends.friends"
      title="Friends"
    />

    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 i18n="@@userProfile.friends.friends2" class="text-lg font-semibold">
        Friends
        <span class="text-muted-foreground font-normal">{{
          countOf(shown().length)
        }}</span>
      </h2>
      <div scInputGroup class="max-w-xs">
        <input
          i18n-aria-label="@@userProfile.friends.searchFriends"
          i18n-placeholder="@@userProfile.friends.searchFriends"
          scInput
          type="search"
          placeholder="Search friends"
          aria-label="Search friends"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
        />
        <div scInputGroupAddon><svg siSearchIcon></svg></div>
      </div>
    </div>

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      @for (friend of shown(); track friend.id) {
        <li class="flex">
          <div scCard class="flex-1 text-center">
            <div scCardBody class="flex flex-col items-center gap-2">
              <span scAvatar class="size-20">
                <img scAvatarImage [src]="friend.avatar" alt="" />
                <span scAvatarFallback class="text-xl">{{
                  initialsOf(friend.name)
                }}</span>
              </span>
              <span class="font-medium">{{ friend.name }}</span>
              <span class="text-muted-foreground text-sm">{{
                labelOf(friend.role)
              }}</span>
            </div>
            <div scCardFooter class="justify-center gap-2">
              <a
                scLink
                variant="outline"
                size="sm"
                [href]="'mailto:' + friend.email"
              >
                <svg siMailIcon></svg>
                <ng-container i18n="@@userProfile.friends.message"
                  >Message</ng-container
                >
                <span class="sr-only">{{ friend.name }}</span>
              </a>
              <button
                scButton
                variant="ghost"
                size="sm"
                (click)="unfriend(friend)"
              >
                <svg siUserMinusIcon></svg>
                <ng-container i18n="@@userProfile.friends.remove"
                  >Remove</ng-container
                >
                <span class="sr-only">{{ friend.name }}</span>
              </button>
            </div>
          </div>
        </li>
      } @empty {
        <li
          i18n="@@userProfile.friends.noFriendsMatch"
          class="text-muted-foreground col-span-full p-6 text-center text-sm"
        >
          No friends match.
        </li>
      }
    </ul>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FriendsPage {
  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  private readonly toaster = inject(ScToaster);
  private readonly query = signal('');
  private readonly friends = signal<readonly Person[]>(PEOPLE.slice(1));
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.friends().filter((p) => p.name.toLowerCase().includes(q));
  });
  private readonly initialsOf = initials;

  private unfriend(friend: Person): void {
    this.friends.update((all) => all.filter((p) => p.id !== friend.id));
    this.toaster.show({
      title: $localize`:@@userProfile.friends.removedFromFriends:${friend.name} removed from friends`,
    });
  }
}
