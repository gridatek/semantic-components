import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCommandNext,
  ScCommandNextEmpty,
  ScCommandNextGroup,
  ScCommandNextGroupLabel,
  ScCommandNextInput,
  ScCommandNextInputGroup,
  ScCommandNextItem,
  ScCommandNextList,
  ScCommandNextStatus,
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
  selector: 'app-keywords-command-next-demo',
  imports: [
    ScCommandNext,
    ScCommandNextEmpty,
    ScCommandNextGroup,
    ScCommandNextGroupLabel,
    ScCommandNextInput,
    ScCommandNextInputGroup,
    ScCommandNextItem,
    ScCommandNextList,
    ScCommandNextStatus,
    ScFrame,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiUserIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scCommandNext #cmd="scCommandNext" scFrame>
        <div scCommandNextInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandNextInput
            placeholder="Try preferences or money..."
            aria-label="Search commands"
          />
        </div>
        <div scCommandNextList aria-label="Commands">
          <div scCommandNextEmpty>No results found.</div>
          <div scCommandNextGroup>
            <div scCommandNextGroupLabel>Settings</div>
            <div
              scCommandNextItem
              [keywords]="['account', 'avatar', 'name']"
              (select)="ran('Profile')"
            >
              <svg siUserIcon></svg>
              <span>Profile</span>
            </div>
            <div
              scCommandNextItem
              [keywords]="['money', 'invoice', 'payment']"
              (select)="ran('Billing')"
            >
              <svg siCreditCardIcon></svg>
              <span>Billing</span>
            </div>
            <div
              scCommandNextItem
              [keywords]="['preferences', 'options']"
              (select)="ran('Settings')"
            >
              <svg siSettingsIcon></svg>
              <span>Settings</span>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KeywordsCommandNextDemo {
  protected readonly last = signal('');

  protected ran(name: string): void {
    this.last.set(name);
  }
}
