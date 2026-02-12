import { Menu, MenuContent } from '@angular/aria/menu';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-menu]',
  imports: [MenuContent],
  hostDirectives: [Menu],
  template: `
    <ng-template ngMenuContent>
      <ng-content />
    </ng-template>
  `,
  host: {
    'data-slot': 'menu',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenu {
  readonly menu = inject(Menu);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md',
      this.menu.visible()
        ? 'opacity-100 visible transition-[opacity,visibility] duration-150 ease-out'
        : 'opacity-0 invisible transition-[opacity,visibility] duration-150 ease-in [transition-delay:0s,150ms]',
      this.classInput(),
    ),
  );
}
