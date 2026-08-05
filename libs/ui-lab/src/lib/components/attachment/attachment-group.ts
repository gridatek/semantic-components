import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scAttachmentGroup]',
  host: {
    'data-slot': 'attachment-group',
    '[class]': 'class()',
  },
})
export class ScAttachmentGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex min-w-0 scroll-fade-x snap-x snap-mandatory no-scrollbar gap-3 scroll-px-1 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
      this.classInput(),
    ),
  );
}
