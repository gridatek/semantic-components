import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { MentionUser, ScMentionInput } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-mention-input-demo',
  imports: [ScMentionInput],
  template: `
    <div class="max-w-lg">
      <sc-mention-input
        [(value)]="value"
        [(mentions)]="mentions"
        [users]="sampleUsers"
        placeholder="Type @ to mention someone..."
        (mentionSelect)="onMentionSelect($event)"
      />
    </div>
    <div class="text-muted-foreground mt-3 space-y-1 text-sm">
      <p>Value: {{ value() || 'Empty' }}</p>
      <p>Mentions: {{ mentions().length }} user(s)</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
