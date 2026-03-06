import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScCommandDialogDemo } from './command-dialog-demo';

@Component({
  selector: 'app-command-dialog-demo-container',
  imports: [DemoContainer, ScCommandDialogDemo],
  template: `
    <app-demo-container
      title="Command Dialog"
      [code]="code"
      demoUrl="/demos/command/command-dialog-demo"
    >
      <app-command-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandDialogDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  ScButton,
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
  ScDialog,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTrigger,
  ScHotkey,
  ScKbd,
} from '@semantic-components/ui';
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
    ScButton,
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
    ScDialogTrigger,
    ScDialogPortal,
    ScDialog,
    ScHotkey,
    ScKbd,
    NgTemplateOutlet,
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiSmileIcon,
    SiUserIcon,
  ],
  template: \`
    <div scDialogProvider [(open)]="open">
      <button
        scDialogTrigger
        scButton
        variant="outline"
        class="text-muted-foreground relative w-full text-sm sm:w-64"
      >
        <span>Click or press</span>
        <kbd scKbd scHotkey="mod+j" (scHotkeyPressed)="open.update(v => !v)">
          {{ shortcut() }}
        </kbd>
      </button>
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
                          *ngTemplateOutlet="iconTmpl; context: { icon: item.icon }"
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
                          *ngTemplateOutlet="iconTmpl; context: { icon: item.icon }"
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
          <svg siCalculatorIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
        @case ('user') {
          <svg siUserIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
        @case ('credit-card') {
          <svg siCreditCardIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
        @case ('settings') {
          <svg siSettingsIcon class="size-4 shrink-0" aria-hidden="true"></svg>
        }
      }
    </ng-template>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandDialogDemo {
  readonly shortcut = input('⌘J');
  readonly open = signal(false);
  readonly searchString = signal('');

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
      shortcut: '\\u2318P',
      icon: 'user',
    },
    {
      value: 'billing',
      label: 'Billing',
      keywords: ['payment', 'subscription'],
      shortcut: '\\u2318B',
      icon: 'credit-card',
    },
    {
      value: 'settings',
      label: 'Settings',
      keywords: ['preferences', 'config'],
      shortcut: '\\u2318S',
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

  onSelect(item: string): void {
    console.log('Selected:', item);
    this.open.set(false);
  }
}`;
}
