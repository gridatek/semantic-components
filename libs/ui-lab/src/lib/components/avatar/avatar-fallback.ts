import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScAvatar } from './avatar';

@Directive({
  selector: 'span[sc-avatar-fallback]',
  host: {
    'data-slot': 'avatar-fallback',
    '[class]': 'class()',
  },
})
export class ScAvatarFallback {
  private readonly avatar = inject(ScAvatar);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const status = this.avatar.imageStatus();
    return cn(
      'flex size-full items-center justify-center rounded-full bg-muted',
      status === 'loaded' && 'hidden',
      this.classInput(),
    );
  });
}
