import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scNativeDialogFooter]',
  host: {
    'data-slot': 'native-dialog-footer',
    '[class]': 'class()',
  },
})
export class ScNativeDialogFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      this.classInput(),
    ),
  );
}
