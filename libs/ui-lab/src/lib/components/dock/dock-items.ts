import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_DOCK } from './dock';

@Component({
  selector: 'div[sc-dock-items]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'dock-items',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDockItems {
  readonly dock = inject(SC_DOCK);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.dock.dockClass(), this.classInput()),
  );
}
