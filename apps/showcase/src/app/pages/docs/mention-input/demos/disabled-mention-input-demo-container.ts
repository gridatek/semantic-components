import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledMentionInputDemo } from './disabled-mention-input-demo';

@Component({
  selector: 'app-disabled-mention-input-demo-container',
  imports: [DemoContainer, DisabledMentionInputDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-mention-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledMentionInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScMentionInput,
  ScMentionInputControl,
  ScMentionInputSuggestionItem,
  ScMentionInputSuggestions,
} from '@semantic-components/ui-lab';
import type { MentionUser } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-mention-input-demo',
  imports: [
    ScField,
    ScLabel,
    ScMentionInput,
    ScMentionInputControl,
    ScMentionInputSuggestions,
    ScMentionInputSuggestionItem,
  ],
  template: \`
    <div class="w-full max-w-lg">
      <div scField>
        <label scLabel>Message</label>
        <div scMentionInput [users]="sampleUsers" #mention="scMentionInput">
          <textarea
            scMentionInputControl
            [disabled]="true"
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledMentionInputDemo {
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
}`;
}
