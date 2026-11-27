import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScDialog,
  ScDialogClose,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScSeparator,
  ScTextarea,
  ScToaster,
  ScToggle,
} from '@semantic-components/ui';
import {
  SiArchiveIcon,
  SiFileIcon,
  SiInboxIcon,
  SiMailIcon,
  SiPencilIcon,
  SiReplyIcon,
  SiSearchIcon,
  SiSendIcon,
  SiShieldAlertIcon,
  SiStarIcon,
  SiTrash2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { ME, PEOPLE, type Person } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { initials, injectFormats } from '../../shared/formats';

type Folder = 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash';

interface Mail {
  readonly id: number;
  readonly personId: number;
  readonly subject: string;
  readonly body: string;
  readonly date: string;
  readonly folder: Folder;
  readonly read: boolean;
  readonly starred: boolean;
  readonly label?: string;
  readonly attachment?: { readonly name: string; readonly icon: string };
}

const MAILS: readonly Mail[] = [
  {
    id: 1,
    personId: 2,
    subject: 'Pricing page — final copy',
    body: 'Hi Mathew,\n\nThe final copy for the pricing page is attached. I shortened the plan descriptions and moved the FAQ under the table.\n\nCould you take a last look before Thursday?\n\nThanks,\nEmily',
    date: '2026-04-28T09:20',
    folder: 'inbox',
    read: false,
    starred: true,
    label: $localize`:@@email.work:Work`,
    attachment: {
      name: 'pricing-copy.fig',
      icon: 'images/files/icon-figma.svg',
    },
  },
  {
    id: 2,
    personId: 8,
    subject: 'Vandelay renewal signed',
    body: 'Great news — Vandelay renewed for another year on the Team plan, with ten more seats. The countersigned contract is in the shared drive.\n\nOlivia',
    date: '2026-04-27T16:05',
    folder: 'inbox',
    read: false,
    starred: false,
    label: $localize`:@@email.work:Work`,
  },
  {
    id: 3,
    personId: 6,
    subject: 'Interview notes, week 17',
    body: 'Five interviews done. The main theme: people want to export a dashboard as a PDF for their board. Notes for each are in the research folder.\n\nSophia',
    date: '2026-04-26T11:40',
    folder: 'inbox',
    read: true,
    starred: true,
    label: $localize`:@@email.work:Work`,
  },
  {
    id: 4,
    personId: 4,
    subject: 'Saturday hike?',
    body: 'We are going up the ridge trail on Saturday morning, back by lunch. Want to come? Bring water, it gets warm.\n\nMaria',
    date: '2026-04-25T19:12',
    folder: 'inbox',
    read: true,
    starred: false,
    label: $localize`:@@email.personal:Personal`,
  },
  {
    id: 5,
    personId: 10,
    subject: 'Support report — April',
    body: 'April numbers: 1,284 tickets, median first reply 42 minutes, satisfaction 94%. The full report is attached.\n\nAva',
    date: '2026-04-24T08:30',
    folder: 'inbox',
    read: true,
    starred: false,
    label: $localize`:@@email.work:Work`,
    attachment: {
      name: 'support-april.pdf',
      icon: 'images/files/icon-adobe.svg',
    },
  },
  {
    id: 6,
    personId: 5,
    subject: 'Photos from the meetup',
    body: 'Here are the photos from last week’s meetup. Feel free to use them on the blog.\n\nDavid',
    date: '2026-04-22T14:55',
    folder: 'inbox',
    read: true,
    starred: false,
    label: $localize`:@@email.social:Social`,
  },
  {
    id: 7,
    personId: 3,
    subject: 'Re: charts build',
    body: 'Fixed in main — the export was missing from the charts entry. CI is green again.\n\nJames',
    date: '2026-04-21T10:02',
    folder: 'sent',
    read: true,
    starred: false,
  },
  {
    id: 8,
    personId: 7,
    subject: 'Draft: on-call rota for May',
    body: 'Week 1: Liam, week 2: Noah, week 3: James, week 4: Liam.',
    date: '2026-04-20T17:30',
    folder: 'drafts',
    read: true,
    starred: false,
  },
  {
    id: 9,
    personId: 9,
    subject: 'You have won a prize!!!',
    body: 'Click here to claim your prize.',
    date: '2026-04-19T03:14',
    folder: 'spam',
    read: false,
    starred: false,
  },
];

const FOLDERS: readonly { value: Folder | 'starred'; label: string }[] = [
  { value: 'inbox', label: $localize`:@@email.inbox:Inbox` },
  { value: 'starred', label: $localize`:@@email.starred:Starred` },
  { value: 'sent', label: $localize`:@@email.sent:Sent` },
  { value: 'drafts', label: $localize`:@@email.drafts:Drafts` },
  { value: 'spam', label: $localize`:@@email.spam:Spam` },
  { value: 'trash', label: $localize`:@@email.trash:Trash` },
];

/** Email (Pro): folders, the list, the message, writing one. */
@Component({
  selector: 'app-email-page',
  imports: [
    FormField,
    NgOptimizedImage,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScDialog,
    ScDialogClose,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScSeparator,
    ScTextarea,
    ScToggle,
    SiArchiveIcon,
    SiFileIcon,
    SiInboxIcon,
    SiMailIcon,
    SiPencilIcon,
    SiReplyIcon,
    SiSearchIcon,
    SiSendIcon,
    SiShieldAlertIcon,
    SiStarIcon,
    SiTrash2Icon,
    SiXIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@email.email"
      title="Email"
      [trail]="[{ label: t.apps }, { label: t.email }]"
    />

    <div
      class="grid min-h-[36rem] gap-4 lg:h-[calc(100svh-14rem)] lg:grid-cols-[13rem_22rem_1fr]"
    >
      <div scCard class="p-3">
        <nav
          i18n-aria-label="@@email.mailFolders"
          class="flex flex-col gap-1"
          aria-label="Mail folders"
        >
          <button scButton class="mb-2" (click)="compose()">
            <svg siPencilIcon></svg>
            <ng-container i18n="@@email.compose">Compose</ng-container>
          </button>
          @for (item of folders; track item.value) {
            <button
              scButton
              variant="ghost"
              class="justify-start"
              [attr.aria-pressed]="folder() === item.value"
              [class.bg-accent]="folder() === item.value"
              (click)="folder.set(item.value); openId.set(null)"
            >
              @switch (item.value) {
                @case ('inbox') {
                  <svg siInboxIcon></svg>
                }
                @case ('starred') {
                  <svg siStarIcon></svg>
                }
                @case ('sent') {
                  <svg siSendIcon></svg>
                }
                @case ('drafts') {
                  <svg siFileIcon></svg>
                }
                @case ('spam') {
                  <svg siShieldAlertIcon></svg>
                }
                @case ('trash') {
                  <svg siTrash2Icon></svg>
                }
              }
              {{ item.label }}
              @if (unreadIn(item.value); as unread) {
                <span
                  i18n="@@email.unread"
                  class="text-muted-foreground ms-auto text-xs tabular-nums"
                >
                  {{ f.count(unread) }}<span class="sr-only"> unread</span>
                </span>
              }
            </button>
          }
        </nav>
      </div>

      <div scCard class="min-h-0 gap-3 py-4">
        <div class="px-4">
          <div scInputGroup>
            <input
              i18n-aria-label="@@email.searchMail"
              i18n-placeholder="@@email.searchMail"
              scInput
              type="search"
              placeholder="Search mail"
              aria-label="Search mail"
              [value]="query()"
              (input)="query.set($any($event.target).value)"
            />
            <div scInputGroupAddon><svg siSearchIcon></svg></div>
          </div>
        </div>
        <ul
          class="flex min-h-0 flex-col overflow-y-auto"
          [attr.aria-label]="folderLabel()"
        >
          @for (mail of list(); track mail.id) {
            <li class="border-b last:border-b-0">
              <button
                type="button"
                class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full flex-col gap-1 px-4 py-3 text-start outline-none focus-visible:ring-3"
                [class.bg-muted]="mail.id === openId()"
                [attr.aria-current]="mail.id === openId() ? 'true' : null"
                (click)="read(mail.id)"
              >
                <span class="flex items-center gap-2">
                  @if (!mail.read) {
                    <span
                      class="bg-primary size-2 shrink-0 rounded-full"
                    ></span>
                    <span i18n="@@email.unread2" class="sr-only">Unread:</span>
                  }
                  <span
                    class="truncate text-sm"
                    [class.font-semibold]="!mail.read"
                    >{{ mail.person.name }}</span
                  >
                  <span
                    class="text-muted-foreground ms-auto shrink-0 text-xs"
                    >{{ shortDate(mail.date) }}</span
                  >
                </span>
                <span
                  class="truncate text-sm"
                  [class.font-medium]="!mail.read"
                  >{{ mail.subject }}</span
                >
                <span class="text-muted-foreground line-clamp-2 text-xs">{{
                  mail.body
                }}</span>
                @if (mail.label) {
                  <span scBadge variant="outline" class="mt-1">{{
                    mail.label
                  }}</span>
                }
              </button>
            </li>
          } @empty {
            <li
              i18n="@@email.nothingHere"
              class="text-muted-foreground p-6 text-center text-sm"
            >
              Nothing here.
            </li>
          }
        </ul>
      </div>

      <div scCard class="min-h-0 overflow-y-auto">
        @if (opened(); as mail) {
          <div class="flex flex-wrap items-center gap-1 px-6">
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              (click)="reply(mail)"
            >
              <svg siReplyIcon></svg>
              <span i18n="@@email.reply" class="sr-only">Reply</span>
            </button>
            <button
              scToggle
              size="sm"
              [pressed]="mail.starred"
              (pressedChange)="star(mail.id)"
            >
              <svg siStarIcon></svg>
              <span i18n="@@email.starred" class="sr-only">Starred</span>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              (click)="markUnread(mail.id)"
            >
              <svg siMailIcon></svg>
              <span i18n="@@email.markAsUnread" class="sr-only"
                >Mark as unread</span
              >
            </button>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              (click)="archive(mail.id)"
            >
              <svg siArchiveIcon></svg>
              <span i18n="@@email.moveToInbox" class="sr-only"
                >Move to inbox</span
              >
            </button>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              class="ms-auto"
              (click)="remove(mail)"
            >
              <svg siTrash2Icon></svg>
              <span class="sr-only">{{
                mail.folder === 'trash' ? t.deleteForever : t.delete
              }}</span>
            </button>
          </div>
          <div scSeparator></div>
          <article class="flex flex-col gap-4 px-6">
            <h2 class="text-xl font-semibold">{{ mail.subject }}</h2>
            <div class="flex items-center gap-3">
              <span scAvatar>
                <img scAvatarImage [src]="mail.person.avatar" alt="" />
                <span scAvatarFallback>{{ initialsOf(mail.person.name) }}</span>
              </span>
              <div class="flex flex-col text-sm">
                <span class="font-medium">{{ mail.person.name }}</span>
                <span class="text-muted-foreground">{{
                  mail.person.email
                }}</span>
              </div>
              <span class="text-muted-foreground ms-auto text-xs">{{
                f.dayTime(mail.date)
              }}</span>
            </div>
            <p class="text-sm whitespace-pre-line">{{ mail.body }}</p>
            @if (mail.attachment; as file) {
              <div
                class="flex w-fit items-center gap-3 rounded-lg border p-3 text-sm"
              >
                <img [ngSrc]="file.icon" width="28" height="28" alt="" />
                {{ file.name }}
              </div>
            }
          </article>
        } @else {
          <div scEmpty class="h-full">
            <div scEmptyHeader>
              <h2 i18n="@@email.noMessageOpen" scEmptyTitle>No message open</h2>
              <div i18n="@@email.pickOneFromTheList" scEmptyDescription>
                Pick one from the list.
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    <div scDialogProvider [(open)]="composing">
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-lg">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span i18n="@@email.close" class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 i18n="@@email.newMessage" scDialogTitle>New Message</h2>
          </div>
          <form id="compose" (submit)="send($event)">
            <div scFieldGroup>
              <div scField>
                <label i18n="@@email.to" scLabel>To</label>
                <input
                  scInput
                  type="email"
                  cdkFocusInitial
                  [formField]="draftForm.to"
                />
              </div>
              <div scField>
                <label i18n="@@email.subject" scLabel>Subject</label>
                <input scInput [formField]="draftForm.subject" />
              </div>
              <div scField>
                <label i18n="@@email.message" scLabel>Message</label>
                <textarea
                  scTextarea
                  rows="8"
                  [formField]="draftForm.body"
                ></textarea>
              </div>
            </div>
          </form>
          <div scDialogFooter>
            <button
              i18n="@@email.cancel"
              scDialogClose
              variant="outline"
              size="default"
            >
              Cancel
            </button>
            <button scButton type="submit" form="compose">
              <svg siSendIcon></svg>
              <ng-container i18n="@@email.send">Send</ng-container>
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class EmailPage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  /** In the user's numbering system. */

  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@email.apps:Apps`,
    email: $localize`:@@email.email:Email`,
    deleteForever: $localize`:@@email.deleteForever:Delete forever`,
    delete: $localize`:@@email.delete:Delete`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly folders = FOLDERS;
  private readonly mails = signal<readonly Mail[]>(MAILS);
  private readonly folder = signal<Folder | 'starred'>('inbox');
  private readonly query = signal('');
  private readonly openId = signal<number | null>(1);

  private readonly withPeople = computed(() =>
    this.mails().map((mail) => ({
      ...mail,
      person: PEOPLE.find((p) => p.id === mail.personId) as Person,
    })),
  );
  private readonly list = computed(() => {
    const folder = this.folder();
    const q = this.query().trim().toLowerCase();
    return this.withPeople()
      .filter((m) =>
        folder === 'starred'
          ? m.starred && m.folder !== 'trash'
          : m.folder === folder,
      )
      .filter(
        (m) =>
          !q ||
          m.subject.toLowerCase().includes(q) ||
          m.person.name.toLowerCase().includes(q) ||
          m.body.toLowerCase().includes(q),
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  });
  private readonly opened = computed(
    () => this.withPeople().find((m) => m.id === this.openId()) ?? null,
  );
  private readonly folderLabel = computed(
    () => FOLDERS.find((f) => f.value === this.folder())?.label ?? '',
  );

  private readonly composing = signal(false);
  private readonly draft = signal({ to: '', subject: '', body: '' });
  private readonly draftForm = form(this.draft, (path) => {
    required(path.to);
    email(path.to);
    required(path.subject);
  });

  private readonly initialsOf = initials;

  private shortDate(iso: string): string {
    return this.f.date(Temporal.PlainDate.from(iso.slice(0, 10)), {
      month: 'short',
      day: 'numeric',
    });
  }

  private unreadIn(folder: Folder | 'starred'): number {
    return this.mails().filter(
      (m) =>
        !m.read &&
        (folder === 'starred'
          ? m.starred && m.folder !== 'trash'
          : m.folder === folder),
    ).length;
  }

  private change(id: number, changes: Partial<Mail>): void {
    this.mails.update((mails) =>
      mails.map((m) => (m.id === id ? { ...m, ...changes } : m)),
    );
  }

  private read(id: number): void {
    this.openId.set(id);
    this.change(id, { read: true });
  }

  private star(id: number): void {
    const mail = this.mails().find((m) => m.id === id);
    if (mail) this.change(id, { starred: !mail.starred });
  }

  private markUnread(id: number): void {
    this.change(id, { read: false });
    this.openId.set(null);
  }

  private archive(id: number): void {
    this.change(id, { folder: 'inbox' });
    this.toaster.show({
      title: $localize`:@@email.movedToTheInbox:Moved to the inbox`,
    });
  }

  private remove(mail: Mail): void {
    if (mail.folder === 'trash') {
      this.mails.update((mails) => mails.filter((m) => m.id !== mail.id));
      this.toaster.show({
        title: $localize`:@@email.deletedForever:Deleted forever`,
      });
    } else {
      this.change(mail.id, { folder: 'trash' });
      this.toaster.show({
        title: $localize`:@@email.movedToTheTrash:Moved to the trash`,
      });
    }
    this.openId.set(null);
  }

  private compose(): void {
    this.draft.set({ to: '', subject: '', body: '' });
    this.composing.set(true);
  }

  private reply(mail: Mail & { person: Person }): void {
    this.draft.set({
      to: mail.person.email,
      subject: mail.subject.startsWith('Re:')
        ? mail.subject
        : `Re: ${mail.subject}`,
      body: `\n\n— ${mail.person.name} wrote:\n${mail.body}`,
    });
    this.composing.set(true);
  }

  private send(event: Event): void {
    event.preventDefault();
    if (this.draftForm().invalid()) return;
    const { to, subject, body } = this.draft();
    const person = PEOPLE.find((p) => p.email === to) ?? ME;
    const id = Math.max(0, ...this.mails().map((m) => m.id)) + 1;
    this.mails.update((mails) => [
      {
        id,
        personId: person.id,
        subject,
        body,
        date: Temporal.Now.plainDateTimeISO().toString().slice(0, 16),
        folder: 'sent',
        read: true,
        starred: false,
      },
      ...mails,
    ]);
    this.composing.set(false);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@email.messageSent:Message sent`,
    });
  }
}
