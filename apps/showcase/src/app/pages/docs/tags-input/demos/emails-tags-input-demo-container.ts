import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EmailsTagsInputDemo } from './emails-tags-input-demo';

@Component({
  selector: 'app-emails-tags-input-demo-container',
  imports: [DemoContainer, EmailsTagsInputDemo],
  template: `
    <app-demo-container
      title="Emails"
      [code]="code"
      demoUrl="/demos/tags-input/emails-tags-input-demo"
    >
      <app-emails-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EmailsTagsInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInput,
  type ScTagsInputAccept,
  ScTagsInputControl,
  ScTagsInputItem,
  ScTagsInputItemRemove,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** accept decides what goes in — here an address, once. Refused text stays, marked, to be corrected; a pasted list is split on commas and new lines. */
@Component({
  selector: 'app-emails-tags-input-demo',
  imports: [
    ScTagsInput,
    ScTagsInputControl,
    ScTagsInputItem,
    ScTagsInputItemRemove,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiXIcon,
  ],
  template: \`
    <div scField class="w-full max-w-md">
      <label scLabel>Invite</label>
      <div
        scTagsInput
        #invite="scTagsInput"
        [(value)]="emails"
        [accept]="isEmail"
      >
        @for (email of emails(); track $index) {
          <span scTagsInputItem>
            <span>{{ email }}</span>
            <button scTagsInputItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ email }}</span>
            </button>
          </span>
        }
        <input scTagsInputControl type="email" placeholder="name@example.com" />
      </div>
      @if (invite.rejected()) {
        <p class="text-destructive text-sm">
          Not an email address, or already invited.
        </p>
      } @else {
        <p scFieldDescription>Paste a list to add them all.</p>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmailsTagsInputDemo {
  readonly emails = signal<string[]>(['ada@example.com']);

  /** An address, not invited yet. */
  readonly isEmail: ScTagsInputAccept = (tag, tags) =>
    /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(tag) && !tags.includes(tag);
}`;
}
