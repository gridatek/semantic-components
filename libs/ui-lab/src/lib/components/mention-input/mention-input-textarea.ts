import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScMentionInputState } from './mention-input-state';

@Directive({
  selector: 'textarea[scMentionInputTextarea]',
  host: {
    'data-slot': 'mention-input-textarea',
    '[class]': 'class()',
    '[value]': 'state.value()',
    '(input)': 'state.onInput($event)',
    '(keydown)': 'state.onKeydown($event)',
    '(blur)': 'state.onBlur()',
  },
})
export class ScMentionInputTextarea {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScMentionInputState);
  private readonly elementRef = inject(ElementRef<HTMLTextAreaElement>);

  protected readonly class = computed(() =>
    cn(
      'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'resize-none',
      this.classInput(),
    ),
  );

  constructor() {
    this.state.textareaEl = this.elementRef;
  }
}
