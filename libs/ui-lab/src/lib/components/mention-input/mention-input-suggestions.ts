import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScMentionInputState } from './mention-input-state';

@Directive({
  selector: 'div[scMentionInputSuggestions]',
  host: {
    'data-slot': 'mention-input-suggestion-list',
    role: 'listbox',
    '[class]': 'class()',
    '[style.top.px]': 'state.suggestionsPosition().top',
    '[style.left.px]': 'state.suggestionsPosition().left',
  },
})
export class ScMentionInputSuggestions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScMentionInputState);

  protected readonly class = computed(() =>
    cn(
      'absolute z-50 w-64 rounded-md border bg-popover p-1 shadow-md',
      'animate-in fade-in-0 zoom-in-95',
      this.classInput(),
    ),
  );
}
