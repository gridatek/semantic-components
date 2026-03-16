import {
  Directive,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScMentionInputState } from './mention-input-state';
import type { MentionUser } from './mention-input-types';

@Directive({
  selector: 'div[scMentionInput]',
  exportAs: 'scMentionInput',
  providers: [ScMentionInputState],
  host: {
    'data-slot': 'mention-input',
    '[class]': 'class()',
  },
})
export class ScMentionInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly users = input<MentionUser[]>([]);
  readonly trigger = input<string>('@');

  readonly value = model<string>('');
  readonly mentions = model<MentionUser[]>([]);

  readonly mentionSelect = output<MentionUser>();

  private readonly state = inject(ScMentionInputState);

  readonly showSuggestions = this.state.showSuggestions.asReadonly();
  readonly filteredUsers = this.state.filteredUsers;

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    this.state.users = this.users;
    this.state.trigger = this.trigger;
    this.state.value = this.value;
    this.state.mentions = this.mentions;
    this.state.onMentionSelect = (user) => {
      this.mentionSelect.emit(user);
    };
  }

  focus(): void {
    this.state.focus();
  }

  getMentions(): MentionUser[] {
    return this.mentions();
  }

  clearMentions(): void {
    this.state.clearMentions();
  }
}
