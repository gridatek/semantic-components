import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-code-editor]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'code-editor',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCodeEditor {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'overflow-hidden rounded-lg border border-border bg-muted focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      this.classInput(),
    ),
  );
}
