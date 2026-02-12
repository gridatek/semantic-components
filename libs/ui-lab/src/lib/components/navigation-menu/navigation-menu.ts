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
  selector: 'nav[sc-navigation-menu]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'navigation-menu',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenu {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Currently active item ID */
  readonly activeItem = signal<string | null>(null);

  protected readonly class = computed(() =>
    cn(
      'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
      this.classInput(),
    ),
  );

  setActiveItem(id: string | null): void {
    this.activeItem.set(id);
  }
}
