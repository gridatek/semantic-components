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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsMentionInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMentionInput, MentionUser } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-avatars-mention-input-demo',
  imports: [ScMentionInput],
  template: \`
    <div class="max-w-lg">
      <sc-mention-input
        [users]="usersWithAvatars"
        placeholder="Mention team members..."
        [rows]="4"
      />
    </div>
  \`,
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
