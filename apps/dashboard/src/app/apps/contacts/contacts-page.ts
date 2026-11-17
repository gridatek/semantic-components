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
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
  ScLabel,
  ScSeparator,
  ScToaster,
  ScToggle,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiBuildingIcon,
  SiMailIcon,
  SiMapPinIcon,
  SiPencilIcon,
  SiPhoneIcon,
  SiPlusIcon,
  SiSearchIcon,
  SiStarIcon,
  SiTrash2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE, type Person } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { initials } from '../../shared/format';
import { label } from '../../shared/labels';

interface Contact extends Person {
  readonly favourite: boolean;
}

type ContactDraft = Pick<
  Contact,
  'name' | 'email' | 'phone' | 'role' | 'company' | 'city' | 'country'
>;

const EMPTY: ContactDraft = {
  name: '',
  email: '',
  phone: '',
  role: '',
  company: '',
  city: '',
  country: '',
};

/** Contacts (Pro): the list, one contact, adding and editing. */
@Component({
  selector: 'app-contacts-page',
  imports: [
    FormField,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
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
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    ScLabel,
    ScSeparator,
    ScToggle,
    ScToggleGroup,
    ScToggleGroupItem,
    SiBuildingIcon,
    SiMailIcon,
    SiMapPinIcon,
    SiPencilIcon,
    SiPhoneIcon,
    SiPlusIcon,
    SiSearchIcon,
    SiStarIcon,
    SiTrash2Icon,
    SiXIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title
      title="Contacts"
      [trail]="[{ label: t.apps }, { label: t.contacts }]"
    >
      <button scButton (click)="startAdding()">
        <svg siPlusIcon></svg>
        <ng-container i18n>Add Contact</ng-container>
      </button>
    </app-page-header>

    <div class="grid min-h-[34rem] gap-4 lg:grid-cols-[22rem_1fr]">
      <div scCard class="gap-3 py-4">
        <div class="flex flex-col gap-3 px-4">
          <div scInputGroup>
            <input
              i18n-aria-label
              i18n-placeholder
              scInput
              type="search"
              placeholder="Search contacts"
              aria-label="Search contacts"
              [value]="query()"
              (input)="query.set($any($event.target).value)"
            />
            <div scInputGroupAddon><svg siSearchIcon></svg></div>
          </div>
          <div
            i18n-aria-label
            scToggleGroup
            variant="outline"
            size="sm"
            aria-label="Show"
            [value]="[filter()]"
            (valueChange)="chooseFilter($event)"
          >
            <button i18n scToggleGroupItem value="all">All</button>
            <button i18n scToggleGroupItem value="favourites">
              Favourites
            </button>
            <button i18n scToggleGroupItem value="online">Online</button>
          </div>
        </div>
        <ul
          i18n-aria-label
          class="flex flex-col gap-1 px-2"
          aria-label="Contacts"
        >
          @for (contact of shown(); track contact.id) {
            <li>
              <button
                scItem
                size="sm"
                class="w-full"
                [attr.aria-pressed]="contact.id === selectedId()"
                (click)="selectedId.set(contact.id)"
              >
                <div scItemMedia>
                  <span scAvatar>
                    <img scAvatarImage [src]="contact.avatar" alt="" />
                    <span scAvatarFallback>{{ initialsOf(contact.name) }}</span>
                  </span>
                </div>
                <div scItemBody>
                  <div scItemTitle>{{ contact.name }}</div>
                  <p scItemDescription>{{ labelOf(contact.role) }}</p>
                </div>
                @if (contact.favourite) {
                  <svg siStarIcon class="fill-current"></svg>
                  <span i18n class="sr-only">Favourite</span>
                }
              </button>
            </li>
          } @empty {
            <li i18n class="text-muted-foreground p-6 text-center text-sm">
              No contacts match.
            </li>
          }
        </ul>
      </div>

      <div scCard>
        @if (selected(); as contact) {
          <div class="flex flex-wrap items-center gap-4 px-6">
            <span scAvatar class="size-20">
              <img scAvatarImage [src]="contact.avatar" alt="" />
              <span scAvatarFallback class="text-xl">{{
                initialsOf(contact.name)
              }}</span>
            </span>
            <div class="flex flex-col gap-1">
              <h2 class="text-xl font-semibold">{{ contact.name }}</h2>
              <p i18n class="text-muted-foreground text-sm">
                {{ labelOf(contact.role) }} at {{ contact.company }}
              </p>
            </div>
            <div class="ms-auto flex gap-1">
              <button
                scToggle
                variant="outline"
                [pressed]="contact.favourite"
                (pressedChange)="toggleFavourite(contact.id)"
              >
                <svg siStarIcon></svg>
                <span i18n class="sr-only">Favourite</span>
              </button>
              <button
                scButton
                variant="outline"
                size="icon"
                (click)="startEditing(contact)"
              >
                <svg siPencilIcon></svg>
                <span i18n class="sr-only">Edit</span>
              </button>
              <button
                scButton
                variant="outline"
                size="icon"
                (click)="remove(contact)"
              >
                <svg siTrash2Icon></svg>
                <span i18n class="sr-only">Delete</span>
              </button>
            </div>
          </div>
          <div scSeparator></div>
          <dl class="grid gap-6 px-6 sm:grid-cols-2">
            <div class="flex flex-col gap-1">
              <dt class="text-muted-foreground flex items-center gap-2 text-sm">
                <svg siMailIcon></svg> <ng-container i18n>Email</ng-container>
              </dt>
              <dd>
                <a
                  class="underline-offset-4 hover:underline"
                  [href]="'mailto:' + contact.email"
                  >{{ contact.email }}</a
                >
              </dd>
            </div>
            <div class="flex flex-col gap-1">
              <dt class="text-muted-foreground flex items-center gap-2 text-sm">
                <svg siPhoneIcon></svg> <ng-container i18n>Phone</ng-container>
              </dt>
              <dd>{{ contact.phone }}</dd>
            </div>
            <div class="flex flex-col gap-1">
              <dt class="text-muted-foreground flex items-center gap-2 text-sm">
                <svg siBuildingIcon></svg>
                <ng-container i18n>Company</ng-container>
              </dt>
              <dd>{{ contact.company }}</dd>
            </div>
            <div class="flex flex-col gap-1">
              <dt class="text-muted-foreground flex items-center gap-2 text-sm">
                <svg siMapPinIcon></svg>
                <ng-container i18n>Location</ng-container>
              </dt>
              <dd>{{ contact.city }}, {{ contact.country }}</dd>
            </div>
          </dl>
        } @else {
          <div scEmpty class="h-full">
            <div scEmptyHeader>
              <h2 i18n scEmptyTitle>No contact selected</h2>
              <div i18n scEmptyDescription>
                Pick one from the list, or add one.
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    <div scDialogProvider [(open)]="editing">
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-lg">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span i18n class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>
              {{ editingId() ? t.editContact : t.addContact }}
            </h2>
          </div>
          <form id="contact-form" (submit)="save($event)">
            <div scFieldGroup class="grid gap-4 sm:grid-cols-2">
              <div scField class="sm:col-span-2">
                <label i18n scLabel>Name</label>
                <input scInput cdkFocusInitial [formField]="draftForm.name" />
              </div>
              <div scField>
                <label i18n scLabel>Email</label>
                <input scInput type="email" [formField]="draftForm.email" />
              </div>
              <div scField>
                <label i18n scLabel>Phone</label>
                <input scInput type="tel" [formField]="draftForm.phone" />
              </div>
              <div scField>
                <label i18n scLabel>Role</label>
                <input scInput [formField]="draftForm.role" />
              </div>
              <div scField>
                <label i18n scLabel>Company</label>
                <input scInput [formField]="draftForm.company" />
              </div>
              <div scField>
                <label i18n scLabel>City</label>
                <input scInput [formField]="draftForm.city" />
              </div>
              <div scField>
                <label i18n scLabel>Country</label>
                <input scInput [formField]="draftForm.country" />
              </div>
            </div>
          </form>
          <div scDialogFooter>
            <button i18n scDialogClose variant="outline" size="default">
              Cancel
            </button>
            <button i18n scButton type="submit" form="contact-form">
              Save
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ContactsPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`Apps`,
    contacts: $localize`Contacts`,
    editContact: $localize`Edit Contact`,
    addContact: $localize`Add Contact`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly contacts = signal<readonly Contact[]>(
    PEOPLE.slice(1).map((p) => ({ ...p, favourite: p.id % 3 === 0 })),
  );
  private readonly query = signal('');
  private readonly filter = signal<'all' | 'favourites' | 'online'>('all');
  private readonly selectedId = signal<number | null>(2);
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    const filter = this.filter();
    return this.contacts()
      .filter((c) =>
        filter === 'favourites'
          ? c.favourite
          : filter === 'online'
            ? c.online
            : true,
      )
      .filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  });
  private readonly selected = computed(
    () => this.contacts().find((c) => c.id === this.selectedId()) ?? null,
  );

  private readonly editing = signal(false);
  private readonly editingId = signal<number | null>(null);
  private readonly draft = signal<ContactDraft>({ ...EMPTY });
  private readonly draftForm = form(this.draft, (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
  });
  private readonly initialsOf = initials;

  private chooseFilter(value: readonly string[]): void {
    const next = value[0];
    if (next === 'all' || next === 'favourites' || next === 'online')
      this.filter.set(next);
  }

  private toggleFavourite(id: number): void {
    this.contacts.update((all) =>
      all.map((c) => (c.id === id ? { ...c, favourite: !c.favourite } : c)),
    );
  }

  private startAdding(): void {
    this.editingId.set(null);
    this.draft.set({ ...EMPTY });
    this.editing.set(true);
  }

  private startEditing(contact: Contact): void {
    this.editingId.set(contact.id);
    const { name, email, phone, role, company, city, country } = contact;
    this.draft.set({ name, email, phone, role, company, city, country });
    this.editing.set(true);
  }

  private save(event: Event): void {
    event.preventDefault();
    if (this.draftForm().invalid()) return;
    const id = this.editingId();
    if (id) {
      this.contacts.update((all) =>
        all.map((c) => (c.id === id ? { ...c, ...this.draft() } : c)),
      );
    } else {
      const next = Math.max(0, ...this.contacts().map((c) => c.id)) + 1;
      this.contacts.update((all) => [
        ...all,
        {
          ...this.draft(),
          id: next,
          avatar: '',
          online: false,
          favourite: false,
        },
      ]);
      this.selectedId.set(next);
    }
    this.editing.set(false);
    this.toaster.show({
      variant: 'success',
      title: id ? $localize`Contact updated` : $localize`Contact added`,
    });
  }

  private remove(contact: Contact): void {
    this.contacts.update((all) => all.filter((c) => c.id !== contact.id));
    this.selectedId.set(null);
    this.toaster.show({ title: `${contact.name} deleted` });
  }
}
