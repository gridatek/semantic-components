import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { CommandUsageDemo } from './command-usage-demo';

@Component({
  selector: 'app-command-usage-demo-container',
  imports: [UsageCode, CommandUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-command-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CommandUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCommand,
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
  ScFrame,
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

/** A search over commands, in groups: typing filters them, the arrows move the highlight, Enter runs it. */
@Component({
  selector: 'app-command-usage-demo',
  imports: [
    ScCommand,
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
    ScFrame,
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiSmileIcon,
    SiUserIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommand #cmd="scCommand" scFrame>
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
            <div scCommandItem disabled (select)="ran('Calculator')">
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
export class CommandUsageDemo {
  protected readonly last = signal('');

  protected ran(name: string): void {
    this.last.set(name);
  }
}`;
}
