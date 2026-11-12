import { Directive, computed, input, signal } from '@angular/core';
import { cn } from 'cn';

export type ScAvatarImageStatus = 'idle' | 'loading' | 'loaded' | 'error';
export type ScAvatarSize = 'sm' | 'default' | 'lg';

@Directive({
  selector: 'span[scAvatar]',
  host: {
    'data-slot': 'avatar',
    '[attr.data-size]': 'size()',
    // The image's state, for the fallback (an attribute: hydration updates it).
    '[attr.data-image]': 'imageStatus()',
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
      'after:border-border after:absolute after:inset-0 after:rounded-full after:border after:mix-blend-darken dark:after:mix-blend-lighten',
      'data-[size=lg]:size-10 data-[size=sm]:size-6',
      this.classInput(),
    ),
  );
}
