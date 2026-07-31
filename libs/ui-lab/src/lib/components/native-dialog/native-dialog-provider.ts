import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scNativeDialogProvider]',
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNativeDialogProvider {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly open = model<boolean>(false);

  protected readonly class = computed(() => cn('contents', this.classInput()));
}
