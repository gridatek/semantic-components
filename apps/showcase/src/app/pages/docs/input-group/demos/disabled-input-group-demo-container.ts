import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledInputGroupDemo } from './disabled-input-group-demo';

@Component({
  selector: 'app-disabled-input-group-demo-container',
  imports: [DemoContainer, DisabledInputGroupDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/input-group/disabled-input-group-demo"
      [code]="code"
    >
      <app-disabled-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledInputGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScTextarea,
} from '@semantic-components/ui';
import { SiArrowUpIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/**
 * The group looks disabled when its field is; a disabled button in it — Send,
 * while the message is empty — leaves it as it is.
 */
@Component({
  selector: 'app-disabled-input-group-demo',
  imports: [
    FormField,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScTextarea,
    SiArrowUpIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup>
        <input
          scInput
          placeholder="Search..."
          aria-label="Search"
          [formField]="searchForm.query"
        />
        <div scInputGroupAddon>
          <svg siSearchIcon></svg>
        </div>
      </div>
      <div scInputGroup>
        <textarea
          scTextarea
          placeholder="Write a message..."
          aria-label="Message"
          [formField]="messageForm.text"
        ></textarea>
        <div scInputGroupAddon side="bottom">
          <button
            scInputGroupButton
            type="button"
            size="icon-sm"
            variant="default"
            class="ms-auto rounded-full"
            [disabled]="empty()"
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only">Send</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledInputGroupDemo {
  private readonly search = signal({ query: '' });
  protected readonly searchForm = form(this.search, (s) => disabled(s.query));

  private readonly message = signal({ text: '' });
  protected readonly messageForm = form(this.message);
  protected readonly empty = computed(() => !this.message().text.trim());
}`;
}
