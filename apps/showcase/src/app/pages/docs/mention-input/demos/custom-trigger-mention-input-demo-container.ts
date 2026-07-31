import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomTriggerMentionInputDemo } from './custom-trigger-mention-input-demo';

@Component({
  selector: 'app-custom-trigger-mention-input-demo-container',
  imports: [DemoContainer, CustomTriggerMentionInputDemo],
  template: `
    <app-demo-container title="Custom Trigger" [code]="code">
      <app-custom-trigger-mention-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomTriggerMentionInputDemoContainer {
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
  selector: 'app-custom-trigger-mention-input-demo',
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
        <label scLabel>Channel</label>
        <div
          scMentionInput
          [users]="channelList"
          trigger="#"
          #mention="scMentionInput"
        >
          <textarea
            scMentionInputControl
            placeholder="Type # to mention a channel..."
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
export class CustomTriggerMentionInputDemo {
  readonly channelList: MentionUser[] = [
    { id: '1', name: 'General', username: 'general' },
    { id: '2', name: 'Engineering', username: 'engineering' },
    { id: '3', name: 'Design', username: 'design' },
    { id: '4', name: 'Marketing', username: 'marketing' },
    { id: '5', name: 'Random', username: 'random' },
  ];
}`;
}
