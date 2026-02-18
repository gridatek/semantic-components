import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'sc-collapsible-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'collapsible-body',
    '[class]': 'class()',
    'animate.enter': 'animate-collapsible-down',
    'animate.leave': 'animate-collapsible-up',
  },
  template: `
    <div class="pt-0 pb-2.5">
      <ng-content />
    </div>
  `,
})
export class ScCollapsibleBody {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn('block overflow-hidden', this.classInput()),
  );
}
