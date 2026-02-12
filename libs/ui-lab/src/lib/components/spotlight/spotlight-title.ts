import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-spotlight-title',
  template: `
    <h3 [class]="computedClass()"><ng-content></ng-content></h3>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSpotlightTitle {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('font-semibold text-lg mb-2', this.class()),
  );
}
