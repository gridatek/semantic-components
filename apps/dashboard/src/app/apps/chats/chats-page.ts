import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarImage,
  ScBubble,
  ScBubbleContent,
  ScCard,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
  ScMessageFooter,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiArrowDownIcon,
  SiMailIcon,
  SiMapPinIcon,
  SiPhoneIcon,
  SiSearchIcon,
  SiSendIcon,
} from '@semantic-icons/lucide-icons';
import { ME, PEOPLE, type Person } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { initials } from '../../shared/format';
import { label } from '../../shared/labels';

interface ChatLine {
  readonly id: string;
  readonly from: 'me' | 'them';
  readonly text: string;
  readonly time: string;
  readonly file?: {
    readonly name: string;
    readonly icon: string;
    readonly size: string;
  };
}

interface Thread {
  readonly personId: number;
  readonly unread: number;
  readonly lines: readonly ChatLine[];
}

const THREADS: readonly Thread[] = [
  {
    personId: 2,
    unread: 2,
    lines: [
      {
        id: 'a1',
        from: 'them',
        text: 'Morning! Did you see the new pricing page?',
        time: '09:12',
      },
      {
        id: 'a2',
        from: 'me',
        text: 'Just now — the plans read much better side by side.',
        time: '09:14',
      },
      {
        id: 'a3',
        from: 'them',
        text: 'Great. I put the copy changes in a doc.',
        time: '09:15',
        file: {
          name: 'pricing-copy.fig',
          icon: 'images/files/icon-figma.svg',
          size: '1.2 MB',
        },
      },
      {
        id: 'a4',
        from: 'them',
        text: 'Can you check it before lunch?',
        time: '09:16',
      },
    ],
  },
  {
    personId: 3,
    unread: 0,
    lines: [
      {
        id: 'b1',
        from: 'me',
        text: 'The build is failing on the charts entry.',
        time: 'Yesterday',
      },
      {
        id: 'b2',
        from: 'them',
        text: 'A missing export — fixed in main.',
        time: 'Yesterday',
      },
      { id: 'b3', from: 'me', text: 'Green now, thanks!', time: 'Yesterday' },
    ],
  },
  {
    personId: 4,
    unread: 1,
    lines: [
      {
        id: 'c1',
        from: 'them',
        text: 'Campaign assets for May are ready.',
        time: 'Mon',
        file: {
          name: 'may-campaign.zip',
          icon: 'images/files/icon-zip-folder.svg',
          size: '24 MB',
        },
      },
    ],
  },
  {
    personId: 6,
    unread: 0,
    lines: [
      {
        id: 'd1',
        from: 'them',
        text: 'Five interviews booked for next week.',
        time: 'Sun',
      },
      {
        id: 'd2',
        from: 'me',
        text: 'Perfect, send me the notes after each one.',
        time: 'Sun',
      },
    ],
  },
  {
    personId: 8,
    unread: 0,
    lines: [
      {
        id: 'e1',
        from: 'them',
        text: 'Vandelay signed the annual plan 🎉',
        time: 'Apr 24',
      },
    ],
  },
  {
    personId: 10,
    unread: 0,
    lines: [
      {
        id: 'f1',
        from: 'me',
        text: 'Can you share the support report?',
        time: 'Apr 22',
      },
      {
        id: 'f2',
        from: 'them',
        text: 'Here it is.',
        time: 'Apr 22',
        file: {
          name: 'support-april.pdf',
          icon: 'images/files/icon-adobe.svg',
          size: '860 KB',
        },
      },
    ],
  },
];

/** Chats (Pro): conversations, the one open, who it is with. */
@Component({
  selector: 'app-chats-page',
  imports: [
    NgOptimizedImage,
    ScAvatar,
    ScAvatarBadge,
    ScAvatarFallback,
    ScAvatarImage,
    ScBubble,
    ScBubbleContent,
    ScCard,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
    ScMessageFooter,
    ScMessageScroller,
    ScMessageScrollerButton,
    ScMessageScrollerContent,
    ScMessageScrollerItem,
    ScMessageScrollerViewport,
    ScSeparator,
    SiArrowDownIcon,
    SiMailIcon,
    SiMapPinIcon,
    SiPhoneIcon,
    SiSearchIcon,
    SiSendIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title
      title="Chats"
      [trail]="[{ label: t.apps }, { label: t.chats }]"
    />

    <div
      class="grid min-h-[36rem] gap-4 lg:h-[calc(100svh-14rem)] lg:grid-cols-[18rem_1fr] 2xl:grid-cols-[18rem_1fr_18rem]"
    >
      <div scCard class="min-h-0 gap-3 py-4">
        <div class="px-4">
          <div scInputGroup>
            <input
              i18n-aria-label
              i18n-placeholder
              scInput
              type="search"
              placeholder="Search chats"
              aria-label="Search chats"
              [value]="query()"
              (input)="query.set($any($event.target).value)"
            />
            <div scInputGroupAddon><svg siSearchIcon></svg></div>
          </div>
        </div>
        <ul class="flex min-h-0 flex-col gap-1 overflow-y-auto px-2">
          @for (thread of shown(); track thread.personId) {
            <li>
              <button
                scItem
                size="sm"
                class="w-full"
                [attr.aria-pressed]="thread.personId === currentId()"
                (click)="open(thread.personId)"
              >
                <div scItemMedia>
                  <span scAvatar>
                    <img scAvatarImage [src]="thread.person.avatar" alt="" />
                    <span scAvatarFallback>{{
                      initialsOf(thread.person.name)
                    }}</span>
                    @if (thread.person.online) {
                      <span scAvatarBadge class="bg-success"></span>
                    }
                  </span>
                </div>
                <div scItemBody class="min-w-0">
                  <div scItemTitle class="w-full justify-between">
                    {{ thread.person.name }}
                    <span class="text-muted-foreground text-xs font-normal">{{
                      thread.last.time
                    }}</span>
                  </div>
                  <p scItemDescription class="line-clamp-1">
                    {{ thread.last.from === 'me' ? t.you : ''
                    }}{{ thread.last.text }}
                  </p>
                </div>
                @if (thread.unread) {
                  <span
                    i18n
                    class="bg-primary text-primary-foreground flex size-5 shrink-0 items-center justify-center rounded-full text-xs"
                  >
                    {{ thread.unread }}
                    <span class="sr-only">unread</span>
                  </span>
                }
              </button>
            </li>
          } @empty {
            <li i18n class="text-muted-foreground p-4 text-center text-sm">
              No chats match.
            </li>
          }
        </ul>
      </div>

      <div scCard class="min-h-0 gap-0 overflow-hidden py-0">
        @if (current(); as thread) {
          <div class="flex items-center gap-3 border-b p-4">
            <span scAvatar>
              <img scAvatarImage [src]="thread.person.avatar" alt="" />
              <span scAvatarFallback>{{ initialsOf(thread.person.name) }}</span>
            </span>
            <div class="flex flex-col">
              <h2 class="font-medium">{{ thread.person.name }}</h2>
              <span class="text-muted-foreground text-xs">{{
                thread.person.online ? t.online : t.offline
              }}</span>
            </div>
          </div>
          <div class="relative min-h-0 flex-1">
            <div scMessageScroller autoScroll class="absolute inset-0">
              <div
                scMessageScrollerViewport
                [attr.aria-label]="t.chatWith + thread.person.name"
              >
                <div scMessageScrollerContent class="p-4">
                  @for (line of thread.lines; track line.id) {
                    <div
                      scMessageScrollerItem
                      [messageId]="line.id"
                      [scrollAnchor]="line.from === 'me'"
                    >
                      <div
                        scMessage
                        [alignment]="line.from === 'me' ? 'end' : 'start'"
                      >
                        <div scMessageAvatar>
                          <span scAvatar>
                            <img
                              scAvatarImage
                              [src]="
                                line.from === 'me'
                                  ? me.avatar
                                  : thread.person.avatar
                              "
                              alt=""
                            />
                            <span scAvatarFallback>{{
                              initialsOf(
                                line.from === 'me'
                                  ? me.name
                                  : thread.person.name
                              )
                            }}</span>
                          </span>
                        </div>
                        <div scMessageContent>
                          <div
                            scBubble
                            [variant]="line.from === 'me' ? 'default' : 'muted'"
                          >
                            <div scBubbleContent>{{ line.text }}</div>
                          </div>
                          @if (line.file; as file) {
                            <div scBubble variant="outline">
                              <div
                                scBubbleContent
                                class="flex items-center gap-3"
                              >
                                <img
                                  [ngSrc]="file.icon"
                                  width="28"
                                  height="28"
                                  alt=""
                                />
                                <span class="flex flex-col">
                                  <span class="font-medium">{{
                                    file.name
                                  }}</span>
                                  <span class="text-muted-foreground text-xs">{{
                                    file.size
                                  }}</span>
                                </span>
                              </div>
                            </div>
                          }
                          <div scMessageFooter>{{ line.time }}</div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <button scMessageScrollerButton>
                <svg siArrowDownIcon></svg>
                <span i18n class="sr-only">Scroll to the latest message</span>
              </button>
            </div>
          </div>
          <form class="border-t p-4" (submit)="send($event)">
            <div scInputGroup>
              <input
                i18n-placeholder
                scInput
                [attr.aria-label]="t.message + thread.person.name"
                placeholder="Type a message"
                [value]="draft()"
                (input)="draft.set($any($event.target).value)"
              />
              <div scInputGroupAddon side="inline-end">
                <button
                  scInputGroupButton
                  type="submit"
                  size="icon-xs"
                  [disabled]="!draft().trim()"
                >
                  <svg siSendIcon></svg>
                  <span i18n class="sr-only">Send</span>
                </button>
              </div>
            </div>
          </form>
        } @else {
          <div scEmpty class="h-full">
            <div scEmptyHeader>
              <h2 i18n scEmptyTitle>No chat open</h2>
              <div i18n scEmptyDescription>
                Pick a conversation on the left.
              </div>
            </div>
          </div>
        }
      </div>

      @if (current(); as thread) {
        <aside
          i18n-aria-label
          scCard
          class="hidden 2xl:flex"
          aria-label="Contact"
        >
          <div class="flex flex-col items-center gap-2 px-6 text-center">
            <span scAvatar class="size-20">
              <img scAvatarImage [src]="thread.person.avatar" alt="" />
              <span scAvatarFallback>{{ initialsOf(thread.person.name) }}</span>
            </span>
            <h2 class="font-medium">{{ thread.person.name }}</h2>
            <p class="text-muted-foreground text-sm">
              {{ labelOf(thread.person.role) }}, {{ thread.person.company }}
            </p>
          </div>
          <div scSeparator></div>
          <ul class="flex flex-col gap-3 px-6 text-sm">
            <li class="flex items-center gap-2">
              <svg siMailIcon></svg>{{ thread.person.email }}
            </li>
            <li class="flex items-center gap-2">
              <svg siPhoneIcon></svg>{{ thread.person.phone }}
            </li>
            <li class="flex items-center gap-2">
              <svg siMapPinIcon></svg>{{ thread.person.city }},
              {{ thread.person.country }}
            </li>
          </ul>
          <div scSeparator></div>
          <div class="flex flex-col gap-2 px-6">
            <h3 i18n class="text-sm font-medium">Files</h3>
            <ul class="flex flex-col gap-2">
              @for (line of thread.files; track line.id) {
                <li class="flex items-center gap-3 text-sm">
                  <img
                    [ngSrc]="line.file!.icon"
                    width="24"
                    height="24"
                    alt=""
                  />
                  {{ line.file!.name }}
                </li>
              } @empty {
                <li i18n class="text-muted-foreground text-sm">
                  No files yet.
                </li>
              }
            </ul>
          </div>
        </aside>
      }
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatsPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`Apps`,
    chats: $localize`Chats`,
    you: $localize`You: `,
    online: $localize`Online`,
    offline: $localize`Offline`,
    chatWith: $localize`Chat with `,
    message: $localize`Message `,
  };

  private readonly me = ME;
  private readonly query = signal('');
  private readonly draft = signal('');
  private readonly threads = signal<readonly Thread[]>(THREADS);
  private readonly currentId = signal(THREADS[0].personId);
  private readonly all = computed(() =>
    this.threads().map((thread) => ({
      ...thread,
      person: PEOPLE.find((p) => p.id === thread.personId) as Person,
      last: thread.lines[thread.lines.length - 1],
      files: thread.lines.filter((line) => line.file),
    })),
  );
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.all().filter((t) => t.person.name.toLowerCase().includes(q));
  });
  private readonly current = computed(
    () => this.all().find((t) => t.personId === this.currentId()) ?? null,
  );
  private readonly initialsOf = initials;
  private nextId = 1;

  private open(personId: number): void {
    this.currentId.set(personId);
    this.threads.update((threads) =>
      threads.map((t) => (t.personId === personId ? { ...t, unread: 0 } : t)),
    );
  }

  private send(event: Event): void {
    event.preventDefault();
    const text = this.draft().trim();
    if (!text) return;
    const time = Temporal.Now.plainTimeISO().toString().slice(0, 5);
    const line: ChatLine = { id: `n${this.nextId++}`, from: 'me', text, time };
    const id = this.currentId();
    // The newest conversation goes to the top.
    this.threads.update((threads) => {
      const thread = threads.find((t) => t.personId === id);
      if (!thread) return threads;
      return [
        { ...thread, lines: [...thread.lines, line] },
        ...threads.filter((t) => t.personId !== id),
      ];
    });
    this.draft.set('');
  }
}
