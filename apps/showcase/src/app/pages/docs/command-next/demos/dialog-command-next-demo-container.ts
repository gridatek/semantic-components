import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DialogCommandNextDemo } from './dialog-command-next-demo';

@Component({
  selector: 'app-dialog-command-next-demo-container',
  imports: [DemoContainer, DialogCommandNextDemo],
  template: `
    <app-demo-container
      title="Dialog"
      demoUrl="/demos/command-next/dialog-command-next-demo"
      [code]="code"
    >
      <app-dialog-command-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DialogCommandNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCommandNext,
  ScCommandNextDialog,
  ScCommandNextEmpty,
  ScCommandNextGroup,
  ScCommandNextGroupLabel,
  ScCommandNextInput,
  ScCommandNextInputGroup,
  ScCommandNextItem,
  ScCommandNextList,
  ScCommandNextSeparator,
  ScCommandNextShortcut,
  ScCommandNextStatus,
  ScDialog,
  ScDialogDescription,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
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

/** Opened from anywhere by a key (Ctrl+J, ⌘J on a Mac): your listener (scHotkey), not the command's. */
@Component({
  selector: 'app-dialog-command-next-demo',
  imports: [
    ScButton,
    ScCommandNext,
    ScCommandNextDialog,
    ScCommandNextEmpty,
    ScCommandNextGroup,
    ScCommandNextGroupLabel,
    ScCommandNextInput,
    ScCommandNextInputGroup,
    ScCommandNextItem,
    ScCommandNextList,
    ScCommandNextSeparator,
    ScCommandNextShortcut,
    ScCommandNextStatus,
    ScDialog,
    ScDialogDescription,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    ScHotkey,
    ScKbd,
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiSmileIcon,
    SiUserIcon,
  ],
  template: \`
    <div class="flex flex-col gap-3">
      <div scDialogProvider [(open)]="open">
        <p class="text-muted-foreground text-sm">
          Press
          <kbd
            scKbd
            scHotkey="mod+j"
            #hk="scHotkey"
            (scHotkeyPressed)="open.set(!open())"
            >{{ hk.displayKey() }}</kbd
          >
          or
          <button scButton scDialogTrigger variant="link" class="h-auto p-0">
            open it
          </button>
        </p>
        <ng-template scDialogPortal>
          <div scDialog scCommandNextDialog>
            <h2 scDialogTitle class="sr-only">Command Palette</h2>
            <p scDialogDescription class="sr-only">
              Search for a command to run...
            </p>
            <div scCommandNext #cmd="scCommandNext">
              <div scCommandNextInputGroup>
                <svg siSearchIcon></svg>
                <input
                  scCommandNextInput
                  placeholder="Type a command or search..."
                  aria-label="Search commands"
                />
              </div>
              <div scCommandNextList aria-label="Commands">
                <div scCommandNextEmpty>No results found.</div>
                <div scCommandNextGroup>
                  <div scCommandNextGroupLabel>Suggestions</div>
                  <div scCommandNextItem (select)="ran('Calendar')">
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Search Emoji')">
                    <svg siSmileIcon></svg>
                    <span>Search Emoji</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Calculator')">
                    <svg siCalculatorIcon></svg>
                    <span>Calculator</span>
                  </div>
                </div>
                <div scCommandNextSeparator></div>
                <div scCommandNextGroup>
                  <div scCommandNextGroupLabel>Settings</div>
                  <div scCommandNextItem (select)="ran('Profile')">
                    <svg siUserIcon></svg>
                    <span>Profile</span>
                    <span scCommandNextShortcut>⌘P</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Billing')">
                    <svg siCreditCardIcon></svg>
                    <span>Billing</span>
                    <span scCommandNextShortcut>⌘B</span>
                  </div>
                  <div scCommandNextItem (select)="ran('Settings')">
                    <svg siSettingsIcon></svg>
                    <span>Settings</span>
                    <span scCommandNextShortcut>⌘S</span>
                  </div>
                </div>
              </div>
              <div scCommandNextStatus>{{ cmd.count() }} results</div>
            </div>
          </div>
        </ng-template>
      </div>
      <p class="text-muted-foreground text-sm" aria-live="polite">
        @if (last()) {
          Ran {{ last() }}.
        }
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DialogCommandNextDemo {
  protected readonly open = signal(false);

  protected ran(name: string): void {
    this.open.set(false);
    this.last.set(name);
  }

  protected readonly last = signal('');
}`;
}
