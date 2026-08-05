import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scAttachmentContent]',
  host: {
    'data-slot': 'attachment-content',
    '[class]': 'class()',
  },
})
export class ScAttachmentContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1',
      this.classInput(),
    ),
  );
}
