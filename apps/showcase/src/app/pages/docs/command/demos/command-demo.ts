import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupHeading,
  ScCommandInput,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandShortcut,
} from '@semantic-components/ui-lab';

interface CommandItem {
  value: string;
  label: string;
  icon: SafeHtml;
  keywords?: string[];
  shortcut?: string;
}

@Component({
  selector: 'app-command-demo',
  imports: [
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupHeading,
    ScCommandInput,
    ScCommandItem,
    ScCommandList,
    ScCommandSeparator,
    ScCommandShortcut,
  ],
  template: `
    <div class="flex flex-col gap-8">
      <div class="w-full max-w-md">
        <div sc-command class="rounded-lg border shadow-md">
          <div sc-command-input placeholder="Type a command or search..."></div>
          <div sc-command-list>
            @if (
              filteredSuggestions().length === 0 &&
              filteredSettings().length === 0
            ) {
              <div sc-command-empty>No results found.</div>
            }
            @if (filteredSuggestions().length > 0) {
              <div sc-command-group>
                <span sc-command-group-heading>Suggestions</span>
                @for (item of filteredSuggestions(); track item.value) {
                  <div
                    sc-command-item
                    [value]="item.value"
                    [label]="item.label"
                    (select)="onSelect(item.label)"
                  >
                    <span
                      class="[&>svg]:size-4 [&>svg]:shrink-0"
                      [innerHTML]="item.icon"
                    ></span>
                    <span>{{ item.label }}</span>
                  </div>
                }
              </div>
            }
            @if (
              filteredSuggestions().length > 0 && filteredSettings().length > 0
            ) {
              <div sc-command-separator></div>
            }
            @if (filteredSettings().length > 0) {
              <div sc-command-group>
                <span sc-command-group-heading>Settings</span>
                @for (item of filteredSettings(); track item.value) {
                  <div
                    sc-command-item
                    [value]="item.value"
                    [label]="item.label"
                    (select)="onSelect(item.label)"
                  >
                    <span
                      class="[&>svg]:size-4 [&>svg]:shrink-0"
                      [innerHTML]="item.icon"
                    ></span>
                    <span>{{ item.label }}</span>
                    @if (item.shortcut) {
                      <span sc-command-shortcut>{{ item.shortcut }}</span>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandDemo {
  private readonly command = viewChild.required(ScCommand);
  private readonly sanitizer = inject(DomSanitizer);

  private svg(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`,
    );
  }

  private readonly suggestions: CommandItem[] = [
    {
      value: 'calendar',
      label: 'Calendar',
      icon: this.svg(
        '<rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />',
      ),
    },
    {
      value: 'search emoji',
      label: 'Search Emoji',
      icon: this.svg(
        '<circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" />',
      ),
    },
    {
      value: 'calculator',
      label: 'Calculator',
      icon: this.svg(
        '<rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" />',
      ),
    },
  ];

  private readonly settings: CommandItem[] = [
    {
      value: 'profile',
      label: 'Profile',
      keywords: ['account', 'user'],
      shortcut: '\u2318P',
      icon: this.svg(
        '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />',
      ),
    },
    {
      value: 'billing',
      label: 'Billing',
      keywords: ['payment', 'subscription'],
      shortcut: '\u2318B',
      icon: this.svg(
        '<rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />',
      ),
    },
    {
      value: 'settings',
      label: 'Settings',
      keywords: ['preferences', 'config'],
      shortcut: '\u2318S',
      icon: this.svg(
        '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />',
      ),
    },
  ];

  private filterItems(items: CommandItem[], search: string): CommandItem[] {
    if (!search) return items;
    return items.filter(
      (item) =>
        item.value.includes(search) ||
        item.label.toLowerCase().includes(search) ||
        item.keywords?.some((k) => k.includes(search)),
    );
  }

  readonly filteredSuggestions = computed(() => {
    const search = this.command().value().toLowerCase();
    return this.filterItems(this.suggestions, search);
  });

  readonly filteredSettings = computed(() => {
    const search = this.command().value().toLowerCase();
    return this.filterItems(this.settings, search);
  });

  onSelect(item: string): void {
    console.log('Selected:', item);
  }
}
