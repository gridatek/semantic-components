import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scAttachmentDescription]',
  host: {
    'data-slot': 'attachment-description',
    '[class]': 'class()',
  },
})
export class ScAttachmentDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80',
      this.classInput(),
    ),
  );
}
