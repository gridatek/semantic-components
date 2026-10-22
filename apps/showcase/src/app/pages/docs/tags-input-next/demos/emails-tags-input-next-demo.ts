import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';
import {
  ScTagsInputNext,
  type ScTagsInputNextAccept,
  ScTagsInputNextControl,
  ScTagsInputNextItem,
  ScTagsInputNextItemRemove,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** accept decides what goes in — here an address, once. Refused text stays, marked, to be corrected; a pasted list is split on commas and new lines. */
@Component({
  selector: 'app-emails-tags-input-next-demo',
  imports: [
    ScTagsInputNext,
    ScTagsInputNextControl,
    ScTagsInputNextItem,
    ScTagsInputNextItemRemove,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiXIcon,
  ],
  template: `
    <div scField class="w-full max-w-md">
      <label scLabel>Invite</label>
      <div
        scTagsInputNext
        #invite="scTagsInputNext"
        [(value)]="emails"
        [accept]="isEmail"
      >
        @for (email of emails(); track $index) {
          <span scTagsInputNextItem>
            <span>{{ email }}</span>
            <button scTagsInputNextItemRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ email }}</span>
            </button>
          </span>
        }
        <input
          scTagsInputNextControl
          type="email"
          placeholder="name@example.com"
        />
      </div>
      @if (invite.rejected()) {
        <p class="text-destructive text-sm">
          Not an email address, or already invited.
        </p>
      } @else {
        <p scFieldDescription>Paste a list to add them all.</p>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmailsTagsInputNextDemo {
  readonly emails = signal<string[]>(['ada@example.com']);

  /** An address, not invited yet. */
  readonly isEmail: ScTagsInputNextAccept = (tag, tags) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag) && !tags.includes(tag);
}
