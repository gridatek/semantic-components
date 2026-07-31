import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScMentionInputState } from './mention-input-state';
import type { MentionUser } from './mention-input-types';

@Component({
  selector: 'button[scMentionInputSuggestionItem]',
  template: `
    @if (user().avatar) {
      <img
        [src]="user().avatar"
        [alt]="user().name"
        class="size-6 rounded-full"
      />
    } @else {
      <div
        class="bg-muted flex size-6 items-center justify-center rounded-full text-xs font-medium"
      >
        {{ user().name.charAt(0).toUpperCase() }}
      </div>
    }
    <div class="flex-1 text-left">
      <div class="text-sm font-medium">{{ user().name }}</div>
      <div class="text-muted-foreground text-xs">
        &#64;{{ user().username }}
      </div>
    </div>
  `,
  host: {
    type: 'button',
    role: 'option',
    '[class]': 'class()',
    '[attr.aria-selected]': 'isSelected()',
    '(click)': 'state.selectUser(user())',
    '(mouseenter)': 'state.selectedIndex.set(index())',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMentionInputSuggestionItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly user = input.required<MentionUser>();
  readonly index = input.required<number>();

  protected readonly state = inject(ScMentionInputState);

  protected readonly isSelected = computed(
    () => this.index() === this.state.selectedIndex(),
  );

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
      this.isSelected() && 'bg-muted text-foreground',
      this.classInput(),
    ),
  );
}
