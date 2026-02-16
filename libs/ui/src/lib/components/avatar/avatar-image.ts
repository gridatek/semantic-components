import { computed, Directive, inject, input, OnInit } from '@angular/core';
import { cn } from '../../utils';
import { ScAvatar } from './avatar';

@Directive({
  selector: 'img[sc-avatar-image]',
  host: {
    'data-slot': 'avatar-image',
    '[class]': 'class()',
    '(load)': 'onLoad()',
    '(error)': 'onError()',
  },
})
export class ScAvatarImage implements OnInit {
  private readonly avatar = inject(ScAvatar);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const status = this.avatar.imageStatus();
    return cn(
      'aspect-square size-full',
      status !== 'loaded' && 'hidden',
      this.classInput(),
    );
  });

  ngOnInit(): void {
    this.avatar.imageStatus.set('loading');
  }

  protected onLoad(): void {
    this.avatar.imageStatus.set('loaded');
  }

  protected onError(): void {
    this.avatar.imageStatus.set('error');
  }
}
