import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'sc-spotlight-actions',
  template: `
    <div [class]="computedClass()"><ng-content></ng-content></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSpotlightActions {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex gap-2 mt-4 justify-end', this.class()),
  );
}
