import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { KeywordsCommandDemo } from './keywords-command-demo';

@Component({
  selector: 'app-keywords-command-demo-container',
  imports: [DemoContainer, KeywordsCommandDemo],
  template: `
    <app-demo-container
      title="Keywords"
      demoUrl="/demos/command/keywords-command-demo"
      [code]="code"
    >
      <app-keywords-command-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class KeywordsCommandDemoContainer {
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
  ScCommandStatus,
  ScFrame,
} from '@semantic-components/ui';
import {
  SiCreditCardIcon,
  SiSearchIcon,
  SiSettingsIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

/** More words an item is found by: "preferences" finds Settings, "money" Billing. */
@Component({
  selector: 'app-keywords-command-demo',
  imports: [
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandStatus,
    ScFrame,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiUserIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommand #cmd="scCommand" scFrame>
        <div scCommandInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandInput
            placeholder="Try preferences or money..."
            aria-label="Search commands"
          />
        </div>
        <div scCommandList aria-label="Commands">
          <div scCommandEmpty>No results found.</div>
          <div scCommandGroup>
            <div scCommandGroupLabel>Settings</div>
            <div
              scCommandItem
              [keywords]="['account', 'avatar', 'name']"
              (select)="ran('Profile')"
            >
              <svg siUserIcon></svg>
              <span>Profile</span>
            </div>
            <div
              scCommandItem
              [keywords]="['money', 'invoice', 'payment']"
              (select)="ran('Billing')"
            >
              <svg siCreditCardIcon></svg>
              <span>Billing</span>
            </div>
            <div
              scCommandItem
              [keywords]="['preferences', 'options']"
              (select)="ran('Settings')"
            >
              <svg siSettingsIcon></svg>
              <span>Settings</span>
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
export class KeywordsCommandDemo {
  protected readonly last = signal('');

  protected ran(name: string): void {
    this.last.set(name);
  }
}`;
}
