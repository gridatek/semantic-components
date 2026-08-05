import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scAttachmentActions]',
  host: {
    'data-slot': 'attachment-actions',
    '[class]': 'class()',
  },
})
export class ScAttachmentActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:end-3 group-data-[orientation=vertical]/attachment:gap-1',
      this.classInput(),
    ),
  );
}
