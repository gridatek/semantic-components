import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'sc-spotlight-description',
  template: `
    <p [class]="computedClass()"><ng-content></ng-content></p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSpotlightDescription {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class()),
  );
}
