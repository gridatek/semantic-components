import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarsMentionInputDemo } from './avatars-mention-input-demo';

@Component({
  selector: 'app-avatars-mention-input-demo-container',
  imports: [DemoContainer, AvatarsMentionInputDemo],
  template: `
    <app-demo-container title="With Avatars" [code]="code">
      <app-avatars-mention-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsMentionInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMentionInput,
  ScMentionInputSuggestionItem,
  ScMentionInputSuggestions,
  ScMentionInputTextarea,
} from '@semantic-components/ui-lab';
import type { MentionUser } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-avatars-mention-input-demo',
  imports: [
    ScMentionInput,
    ScMentionInputTextarea,
    ScMentionInputSuggestions,
    ScMentionInputSuggestionItem,
  ],
  template: \`
    <div class="max-w-lg">
      <div scMentionInput [users]="usersWithAvatars" #mention="scMentionInput">
        <textarea
          scMentionInputTextarea
          placeholder="Mention team members..."
          [rows]="4"
        ></textarea>

        @if (mention.showSuggestions() && mention.filteredUsers().length > 0) {
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsMentionInputDemo {
  readonly usersWithAvatars: MentionUser[] = [
    {
      id: '1',
      name: 'Sarah Connor',
      username: 'sconnor',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
    {
      id: '2',
      name: 'James Wilson',
      username: 'jwilson',
      avatar: 'https://i.pravatar.cc/150?u=james',
    },
    {
      id: '3',
      name: 'Emily Chen',
      username: 'echen',
      avatar: 'https://i.pravatar.cc/150?u=emily',
    },
    {
      id: '4',
      name: 'Michael Park',
      username: 'mpark',
      avatar: 'https://i.pravatar.cc/150?u=michael',
    },
  ];
}`;
}
