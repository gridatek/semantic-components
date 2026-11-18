import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScSwitch,
  ScToaster,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';
import { label } from '../../shared/labels';

type Category = 'Communication' | 'Project management' | 'Marketing';

interface Integration {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly category: Category;
  readonly text: string;
  readonly connected: boolean;
}

const INTEGRATIONS: readonly Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    logo: 'gmail.svg',
    category: 'Communication',
    text: $localize`:@@integrations.sendInvoicesAndRepliesFrom:Send invoices and replies from your inbox.`,
    connected: true,
  },
  {
    id: 'meet',
    name: 'Google Meet',
    logo: 'google-meet.svg',
    category: 'Communication',
    text: $localize`:@@integrations.addACallLinkTo:Add a call link to every calendar event.`,
    connected: false,
  },
  {
    id: 'zoom',
    name: 'Zoom',
    logo: 'zoom.svg',
    category: 'Communication',
    text: $localize`:@@integrations.startMeetingsFromAContact:Start meetings from a contact or a ticket.`,
    connected: false,
  },
  {
    id: 'loom',
    name: 'Loom',
    logo: 'loom.svg',
    category: 'Communication',
    text: $localize`:@@integrations.recordAQuickVideoAnswer:Record a quick video answer on a ticket.`,
    connected: true,
  },
  {
    id: 'jira',
    name: 'Jira',
    logo: 'jira.svg',
    category: 'Project management',
    text: $localize`:@@integrations.turnTicketsIntoIssuesAnd:Turn tickets into issues, and sync their status.`,
    connected: false,
  },
  {
    id: 'linear',
    name: 'Linear',
    logo: 'linear.svg',
    category: 'Project management',
    text: $localize`:@@integrations.linkKanbanTasksToLinear:Link Kanban tasks to Linear issues.`,
    connected: true,
  },
  {
    id: 'trello',
    name: 'Trello',
    logo: 'trello.svg',
    category: 'Project management',
    text: $localize`:@@integrations.importBoardsIntoKanban:Import boards into Kanban.`,
    connected: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    logo: 'notion.svg',
    category: 'Project management',
    text: $localize`:@@integrations.publishBlogPostsFromA:Publish blog posts from a Notion page.`,
    connected: false,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    logo: 'mailchimp.svg',
    category: 'Marketing',
    text: $localize`:@@integrations.sendNewCustomersToAn:Send new customers to an audience.`,
    connected: false,
  },
];

/** Integrations (Pro): the services, connected with a switch. */
@Component({
  selector: 'app-integrations-page',
  imports: [
    NgOptimizedImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScSwitch,
    ScToggleGroup,
    ScToggleGroupItem,
    SiSearchIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@integrations.integrations"
      title="Integrations"
      [trail]="[{ label: t.pages }, { label: t.integrations }]"
    />

    <div class="flex flex-wrap items-center gap-3">
      <div scInputGroup class="max-w-xs">
        <input
          i18n-aria-label="@@integrations.searchIntegrations"
          i18n-placeholder="@@integrations.searchIntegrations"
          scInput
          type="search"
          placeholder="Search integrations"
          aria-label="Search integrations"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
        />
        <div scInputGroupAddon><svg siSearchIcon></svg></div>
      </div>
      <div
        i18n-aria-label="@@integrations.category"
        scToggleGroup
        variant="outline"
        size="sm"
        aria-label="Category"
        [value]="[category()]"
        (valueChange)="category.set($event[0] ?? 'All')"
      >
        @for (c of categories; track c) {
          <button scToggleGroupItem [value]="c">{{ labelOf(c) }}</button>
        }
      </div>
      <span
        i18n="@@integrations.connected"
        class="text-muted-foreground ms-auto text-sm"
        >{{ connectedCount() }} connected</span
      >
    </div>

    <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      @for (item of shown(); track item.id) {
        <li class="flex">
          <div scCard class="flex-1">
            <div scCardBody class="flex flex-1 flex-col gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="bg-muted flex size-10 items-center justify-center rounded-lg"
                >
                  <span class="relative size-6">
                    <img
                      [ngSrc]="'images/integrations/' + item.logo"
                      fill
                      alt=""
                      class="object-contain"
                    />
                  </span>
                </span>
                <div class="flex flex-col">
                  <h2 class="font-medium">{{ item.name }}</h2>
                  <span class="text-muted-foreground text-xs">{{
                    labelOf(item.category)
                  }}</span>
                </div>
                @if (item.connected) {
                  <span
                    i18n="@@integrations.connected2"
                    scBadge
                    variant="secondary"
                    class="ms-auto"
                    >Connected</span
                  >
                }
              </div>
              <p class="text-muted-foreground text-sm">{{ item.text }}</p>
            </div>
            <div scCardFooter class="justify-between">
              <label
                i18n="@@integrations.connect"
                scLabel
                [for]="'int-' + item.id"
                >Connect {{ item.name }}</label
              >
              <input
                scSwitch
                type="checkbox"
                [id]="'int-' + item.id"
                [checked]="item.connected"
                (change)="toggle(item)"
              />
            </div>
          </div>
        </li>
      }
    </ul>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class IntegrationsPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    pages: $localize`:@@integrations.pages:Pages`,
    integrations: $localize`:@@integrations.integrations:Integrations`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly categories = [
    'All',
    'Communication',
    'Project management',
    'Marketing',
  ];
  private readonly items = signal<readonly Integration[]>(INTEGRATIONS);
  private readonly query = signal('');
  private readonly category = signal<string>('All');
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.items()
      .filter(
        (i) => this.category() === 'All' || i.category === this.category(),
      )
      .filter((i) => !q || i.name.toLowerCase().includes(q));
  });
  private readonly connectedCount = computed(
    () => this.items().filter((i) => i.connected).length,
  );

  private toggle(item: Integration): void {
    this.items.update((items) =>
      items.map((i) =>
        i.id === item.id ? { ...i, connected: !i.connected } : i,
      ),
    );
    this.toaster.show({
      variant: 'success',
      title: item.connected
        ? `${item.name} disconnected`
        : `${item.name} connected`,
    });
  }
}
