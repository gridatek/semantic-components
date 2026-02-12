import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMentionInput, MentionUser } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-trigger-mention-input-demo',
  imports: [ScMentionInput],
  template: `
    <div class="max-w-lg">
      <sc-mention-input
        [users]="channelList"
        trigger="#"
        placeholder="Type # to mention a channel..."
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTriggerMentionInputDemo {
  readonly channelList: MentionUser[] = [
    { id: '1', name: 'General', username: 'general' },
    { id: '2', name: 'Engineering', username: 'engineering' },
    { id: '3', name: 'Design', username: 'design' },
    { id: '4', name: 'Marketing', username: 'marketing' },
    { id: '5', name: 'Random', username: 'random' },
  ];
}
