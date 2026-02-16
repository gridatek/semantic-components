import { computed, Directive, input, signal } from '@angular/core';
import { cn } from '../../utils';

export type ScAvatarImageStatus = 'idle' | 'loading' | 'loaded' | 'error';
export type ScAvatarSize = 'sm' | 'default' | 'lg';

@Directive({
  selector: 'span[sc-avatar]',
  host: {
    'data-slot': 'avatar',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScAvatar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<ScAvatarSize>('default');

  /** Internal state for image loading */
  readonly imageStatus = signal<ScAvatarImageStatus>('idle');

  protected readonly class = computed(() =>
    cn(
      'group/avatar relative flex size-8 shrink-0 rounded-full select-none',
      'data-[size=lg]:size-10 data-[size=sm]:size-6',
      this.classInput(),
    ),
  );
}
