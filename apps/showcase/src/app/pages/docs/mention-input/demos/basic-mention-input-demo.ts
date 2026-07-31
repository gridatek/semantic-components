import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScMentionInput,
  ScMentionInputControl,
  ScMentionInputSuggestionItem,
  ScMentionInputSuggestions,
} from '@semantic-components/ui-lab';
import type { MentionUser } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-mention-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScMentionInput,
    ScMentionInputControl,
    ScMentionInputSuggestions,
    ScMentionInputSuggestionItem,
  ],
  template: `
    <div class="w-full max-w-lg">
      <div scField>
        <label scLabel>Message</label>
        <div
          scMentionInput
          [users]="sampleUsers"
          [(value)]="value"
          [(mentions)]="mentions"
          (mentionSelect)="onMentionSelect($event)"
          #mention="scMentionInput"
        >
          <textarea
            scMentionInputControl
            placeholder="Type @ to mention someone..."
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
      <div class="text-muted-foreground mt-3 space-y-1 text-sm">
        <p>Value: {{ value() || 'Empty' }}</p>
        <p>Mentions: {{ mentions().length }} user(s)</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMentionInputDemo {
  readonly value = signal('');
  readonly mentions = signal<MentionUser[]>([]);

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

  onMentionSelect(user: MentionUser): void {
    console.log('Mentioned:', user);
  }
}
