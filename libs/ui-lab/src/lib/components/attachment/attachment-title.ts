import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scAttachmentTitle]',
  host: {
    'data-slot': 'attachment-title',
    '[class]': 'class()',
  },
})
export class ScAttachmentTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block max-w-full min-w-0 truncate font-medium', this.classInput()),
  );
}
