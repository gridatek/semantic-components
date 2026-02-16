import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[sc-avatar-group]',
  host: {
    'data-slot': 'avatar-group',
    '[class]': 'class()',
  },
})
export class ScAvatarGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      '*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2',
      this.classInput(),
    ),
  );
}
