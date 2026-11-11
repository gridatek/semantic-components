import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** Items in named groups, a line between them: a group with no match hides, the lines while searching. */
@Component({
  selector: 'app-groups-command-next-demo',
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
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiSmileIcon,
    SiUserIcon,
  ],
  template: `
    <div class="flex flex-col gap-3">
      <div scDialogProvider [(open)]="open">
        <button scButton scDialogTrigger variant="outline">Open Menu</button>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsCommandNextDemo {
  protected readonly open = signal(false);

  protected ran(name: string): void {
    this.open.set(false);
    this.last.set(name);
  }

  protected readonly last = signal('');
}
