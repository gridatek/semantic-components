import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scMessageAvatar]',
  host: {
    'data-slot': 'message-avatar',
    '[class]': 'class()',
  },
})
export class ScMessageAvatar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-data-[slot=message-footer]/message:-translate-y-8',
      this.classInput(),
    ),
  );
}
