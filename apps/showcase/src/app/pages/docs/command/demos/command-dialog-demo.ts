import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScDialog,
  ScDialogPortal,
  ScDialogProvider,
} from '@semantic-components/ui';
import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandListContainer,
  ScCommandSeparator,
  ScCommandShortcut,
} from '@semantic-components/ui-lab';
import {
  SiCalculatorIcon,
  SiCalendarIcon,
  SiCreditCardIcon,
  SiSearchIcon,
  SiSettingsIcon,
  SiSmileIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

interface CommandItem {
  value: string;
  label: string;
  icon: string;
  keywords?: string[];
  shortcut?: string;
}

@Component({
  selector: 'app-command-dialog-demo',
  imports: [
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandListContainer,
    ScCommandSeparator,
    ScCommandShortcut,
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    NgTemplateOutlet,
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiSmileIcon,
    SiUserIcon,
  ],
  template: `
    <div scDialogProvider [(open)]="open">
      <p class="text-muted-foreground text-sm">
        Press
        <kbd
          class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100"
        >
          <span class="text-xs">⌘</span>
          J
        </kbd>
      </p>
      <ng-template scDialogPortal>
        <div scDialog class="w-lg gap-0 p-0">
          <div scCommand class="**:data-[slot=command-input-group]:h-12">
            <div scCommandInputGroup>
              <svg
                siSearchIcon
                class="mr-2 size-4 shrink-0 opacity-50"
                aria-hidden="true"
              ></svg>
              <input
                scCommandInput
                placeholder="Type a command or search..."
                [(value)]="searchString"
              />
            </div>
            <ng-template scCommandListContainer>
              <div scCommandList>
                @if (
                  filteredSuggestions().length === 0 &&
                  filteredSettings().length === 0
                ) {
                  <div scCommandEmpty>No results found.</div>
                }
                @if (filteredSuggestions().length > 0) {
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Suggestions</span>
                    @for (item of filteredSuggestions(); track item.value) {
                      <div
                        scCommandItem
                        [value]="item.value"
                        [label]="item.label"
                        (select)="onSelect(item.label)"
                      >
                        <ng-container
                          *ngTemplateOutlet="
                            iconTmpl;
                            context: { icon: item.icon }
                          "
                        ></ng-container>
                        <span>{{ item.label }}</span>
                      </div>
                    }
                  </div>
                }
                @if (
                  filteredSuggestions().length > 0 &&
                  filteredSettings().length > 0
                ) {
                  <div scCommandSeparator></div>
                }
                @if (filteredSettings().length > 0) {
                  <div scCommandGroup>
                    <span scCommandGroupLabel>Settings</span>
                    @for (item of filteredSettings(); track item.value) {
                      <div
                        scCommandItem
                        [value]="item.value"
                        [label]="item.label"
                        (select)="onSelect(item.label)"
                      >
                        <ng-container
                          *ngTemplateOutlet="
                            iconTmpl;
                            context: { icon: item.icon }
                          "
                        ></ng-container>
                        <span>{{ item.label }}</span>
                        @if (item.shortcut) {
                          <span scCommandShortcut>{{ item.shortcut }}</span>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </div>
      </ng-template>
    </div>

    <ng-template #iconTmpl let-icon="icon">
      @switch (icon) {
        @case ('calendar') {
          <svg siCalendarIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
        @case ('smile') {
          <svg siSmileIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
        @case ('calculator') {
          <svg
            siCalculatorIcon
            class="size-4 shrink-0"
            aria-hidden="true"
          ></svg>
        }
        @case ('user') {
          <svg siUserIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
        @case ('credit-card') {
          <svg
            siCreditCardIcon
            class="size-4 shrink-0"
            aria-hidden="true"
          ></svg>
        }
        @case ('settings') {
          <svg siSettingsIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
      }
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandDialogDemo {
  readonly open = signal(false);
  readonly searchString = signal('');

  private readonly destroyRef = inject(DestroyRef);

  private readonly suggestions: CommandItem[] = [
    { value: 'calendar', label: 'Calendar', icon: 'calendar' },
    { value: 'search emoji', label: 'Search Emoji', icon: 'smile' },
    { value: 'calculator', label: 'Calculator', icon: 'calculator' },
  ];

  private readonly settings: CommandItem[] = [
    {
      value: 'profile',
      label: 'Profile',
      keywords: ['account', 'user'],
      shortcut: '\u2318P',
      icon: 'user',
    },
    {
      value: 'billing',
      label: 'Billing',
      keywords: ['payment', 'subscription'],
      shortcut: '\u2318B',
      icon: 'credit-card',
    },
    {
      value: 'settings',
      label: 'Settings',
      keywords: ['preferences', 'config'],
      shortcut: '\u2318S',
      icon: 'settings',
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
    const search = this.searchString().toLowerCase();
    return this.filterItems(this.suggestions, search);
  });

  readonly filteredSettings = computed(() => {
    const search = this.searchString().toLowerCase();
    return this.filterItems(this.settings, search);
  });

  constructor() {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        this.open.update((v) => !v);
      }
    };

    document.addEventListener('keydown', handler);
    this.destroyRef.onDestroy(() =>
      document.removeEventListener('keydown', handler),
    );
  }

  onSelect(item: string): void {
    console.log('Selected:', item);
    this.open.set(false);
  }
}
