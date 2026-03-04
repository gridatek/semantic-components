import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'p[scNativeDialogDescription]',
  host: {
    'data-slot': 'native-dialog-description',
    '[class]': 'class()',
  },
})
export class ScNativeDialogDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );
}
