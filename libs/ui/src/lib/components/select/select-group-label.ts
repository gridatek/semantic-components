import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scSelectGroupLabel]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'select-group-label',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectGroupLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground px-2 py-1.5 text-xs font-medium',
      this.classInput(),
    ),
  );
}
