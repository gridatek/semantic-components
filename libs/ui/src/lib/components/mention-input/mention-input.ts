import {
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScMentionInputState } from './mention-input-state';
import type { ScMentionUser } from './mention-input-types';

export const SC_MENTION_INPUT = new InjectionToken<ScMentionInput>(
  'ScMentionInput',
);

@Directive({
  selector: '[scMentionInput]',
  exportAs: 'scMentionInput',
  providers: [
    ScMentionInputState,
    { provide: SC_MENTION_INPUT, useExisting: ScMentionInput },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScMentionInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly users = input<ScMentionUser[]>([]);
  readonly trigger = input<string>('@');

  readonly value = model<string>('');
  readonly mentions = model<ScMentionUser[]>([]);

  readonly mentionSelect = output<ScMentionUser>();

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

  getMentions(): ScMentionUser[] {
    return this.mentions();
  }

  clearMentions(): void {
    this.state.clearMentions();
  }
}
