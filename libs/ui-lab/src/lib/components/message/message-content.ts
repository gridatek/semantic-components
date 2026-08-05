import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scMessageContent]',
  host: {
    'data-slot': 'message-content',
    '[class]': 'class()',
  },
})
export class ScMessageContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end',
      this.classInput(),
    ),
  );
}
