import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScMentionInput,
  ScMentionInputControl,
  ScMentionInputSuggestionItem,
  ScMentionInputSuggestions,
} from '@semantic-components/ui-lab';
import type { MentionUser } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-mention-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScMentionInput,
    ScMentionInputControl,
    ScMentionInputSuggestions,
    ScMentionInputSuggestionItem,
  ],
  template: `
    <div class="w-full max-w-lg space-y-3 rounded-lg border p-4">
      <div class="flex items-center gap-3">
        <div
          class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-medium"
        >
          JD
        </div>
        <span class="font-medium">John Doe</span>
      </div>
      <div scField>
        <label scLabel>Comment</label>
        <div
          scMentionInput
          [(value)]="commentValue"
          [users]="sampleUsers"
          #mention="scMentionInput"
        >
          <textarea
            scMentionInputControl
            placeholder="Write a comment... Use @ to mention someone"
          ></textarea>

          @if (
            mention.showSuggestions() && mention.filteredUsers().length > 0
          ) {
            <div scMentionInputSuggestions>
              @for (
                user of mention.filteredUsers();
                track user.id;
                let i = $index
              ) {
                <button
                  scMentionInputSuggestionItem
                  [user]="user"
                  [index]="i"
                ></button>
              }
            </div>
          }
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <button
          class="border-input hover:bg-accent inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium"
          [disabled]="!commentValue()"
        >
          Post Comment
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMentionInputDemo {
  readonly commentValue = signal('');

  readonly sampleUsers: MentionUser[] = [
    { id: '1', name: 'John Doe', username: 'johndoe' },
    { id: '2', name: 'Jane Smith', username: 'janesmith' },
    { id: '3', name: 'Bob Wilson', username: 'bobwilson' },
    { id: '4', name: 'Alice Brown', username: 'alicebrown' },
    { id: '5', name: 'Charlie Davis', username: 'charlied' },
    { id: '6', name: 'Eva Martinez', username: 'evam' },
    { id: '7', name: 'Frank Johnson', username: 'frankj' },
    { id: '8', name: 'Grace Lee', username: 'gracelee' },
  ];
}
