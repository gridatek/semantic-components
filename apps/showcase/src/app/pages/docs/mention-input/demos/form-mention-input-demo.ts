import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScMentionInput, MentionUser } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-mention-input-demo',
  imports: [ScMentionInput],
  template: `
    <div class="max-w-lg rounded-lg border p-4 space-y-3">
      <div class="flex items-center gap-3">
        <div
          class="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium"
        >
          JD
        </div>
        <span class="font-medium">John Doe</span>
      </div>
      <sc-mention-input
        [(value)]="commentValue"
        [users]="sampleUsers"
        placeholder="Write a comment... Use @ to mention someone"
        [rows]="3"
      />
      <div class="flex justify-end gap-2">
        <button
          class="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium border border-input hover:bg-accent"
        >
          Cancel
        </button>
        <button
          class="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          [disabled]="!commentValue()"
        >
          Post Comment
        </button>
      </div>
    </div>
  `,
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
