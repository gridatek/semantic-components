import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { CommandNextUsageDemo } from './command-next-usage-demo';

@Component({
  selector: 'app-command-next-usage-demo-container',
  imports: [UsageCode, CommandNextUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-command-next-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CommandNextUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCommandNext,
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
  selector: 'app-command-next-usage-demo',
  imports: [
    ScCommandNext,
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
      <div scCommandNext #cmd="scCommandNext" class="rounded-lg border">
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
            <div scCommandNextItem disabled (select)="ran('Calculator')">
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
export class CommandNextUsageDemo {
  protected readonly last = signal('');

  protected ran(name: string): void {
    this.last.set(name);
  }
}`;
}
