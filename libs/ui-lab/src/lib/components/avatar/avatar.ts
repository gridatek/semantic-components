import { computed, Directive, input, signal } from '@angular/core';
import { cn } from '../../utils';

export type ScAvatarImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

@Directive({
  selector: 'span[sc-avatar]',
  host: {
    'data-slot': 'avatar',
    '[class]': 'class()',
  },
})
export class ScAvatar {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Internal state for image loading */
  readonly imageStatus = signal<ScAvatarImageStatus>('idle');

  protected readonly class = computed(() =>
    cn(
      'relative flex size-10 shrink-0 overflow-hidden rounded-full',
      this.classInput(),
    ),
  );
}
