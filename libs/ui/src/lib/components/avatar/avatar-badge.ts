import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'span[scAvatarBadge]',
  host: {
    'data-slot': 'avatar-badge',
    '[class]': 'class()',
  },
})
export class ScAvatarBadge {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 size-2.5 inline-flex items-center justify-center rounded-full ring-2 select-none [&>svg]:size-2',
      'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
      'group-data-[size=lg]/avatar:size-3',
      this.classInput(),
    ),
  );
}
