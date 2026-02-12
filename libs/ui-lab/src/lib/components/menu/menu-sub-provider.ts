import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
import { ScMenuSubTrigger } from './menu-sub-trigger';
import { ScMenuSub } from './menu-sub';

@Component({
  selector: 'div[sc-menu-sub-provider]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'menu-sub-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuSubProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly triggerChild = contentChild(ScMenuSubTrigger);
  private readonly content = contentChild(ScMenuSub, {
    descendants: true,
  });

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);
  readonly menuItem = computed(() => this.triggerChild()?.menuItem);
  readonly submenu = computed(() => this.content()?.menu);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    // Auto-connect trigger's submenu to the content's menu
    effect(() => {
      const menuItem = this.triggerChild()?.menuItem;
      const submenu = this.content()?.menu;
      if (menuItem && submenu) {
        signalSetFn(menuItem.submenu[SIGNAL], submenu);
      }
    });
  }
}
