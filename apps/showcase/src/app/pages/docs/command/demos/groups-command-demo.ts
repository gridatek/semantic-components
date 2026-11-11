import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCommand,
  ScCommandDialog,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandShortcut,
  ScCommandStatus,
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
  selector: 'app-groups-command-demo',
  imports: [
    ScButton,
    ScCommand,
    ScCommandDialog,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandSeparator,
    ScCommandShortcut,
    ScCommandStatus,
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
          <div scDialog scCommandDialog>
            <h2 scDialogTitle class="sr-only">Command Palette</h2>
            <p scDialogDescription class="sr-only">
              Search for a command to run...
            </p>
            <div scCommand #cmd="scCommand">
              <div scCommandInputGroup>
                <svg siSearchIcon></svg>
                <input
                  scCommandInput
                  placeholder="Type a command or search..."
                  aria-label="Search commands"
                />
              </div>
              <div scCommandList aria-label="Commands">
                <div scCommandEmpty>No results found.</div>
                <div scCommandGroup>
                  <div scCommandGroupLabel>Suggestions</div>
                  <div scCommandItem (select)="ran('Calendar')">
                    <svg siCalendarIcon></svg>
                    <span>Calendar</span>
                  </div>
                  <div scCommandItem (select)="ran('Search Emoji')">
                    <svg siSmileIcon></svg>
                    <span>Search Emoji</span>
                  </div>
                  <div scCommandItem (select)="ran('Calculator')">
                    <svg siCalculatorIcon></svg>
                    <span>Calculator</span>
                  </div>
                </div>
                <div scCommandSeparator></div>
                <div scCommandGroup>
                  <div scCommandGroupLabel>Settings</div>
                  <div scCommandItem (select)="ran('Profile')">
                    <svg siUserIcon></svg>
                    <span>Profile</span>
                    <span scCommandShortcut>⌘P</span>
                  </div>
                  <div scCommandItem (select)="ran('Billing')">
                    <svg siCreditCardIcon></svg>
                    <span>Billing</span>
                    <span scCommandShortcut>⌘B</span>
                  </div>
                  <div scCommandItem (select)="ran('Settings')">
                    <svg siSettingsIcon></svg>
                    <span>Settings</span>
                    <span scCommandShortcut>⌘S</span>
                  </div>
                </div>
              </div>
              <div scCommandStatus>{{ cmd.count() }} results</div>
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
export class GroupsCommandDemo {
  protected readonly open = signal(false);

  protected ran(name: string): void {
    this.open.set(false);
    this.last.set(name);
  }

  protected readonly last = signal('');
}
