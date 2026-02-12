import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-context-menu-sub]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'context-menu-sub',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuSub {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Whether the submenu is open */
  readonly open = signal<boolean>(false);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  show(): void {
    this.open.set(true);
  }

  hide(): void {
    this.open.set(false);
  }
}
