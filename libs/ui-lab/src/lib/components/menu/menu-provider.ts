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
import { ScMenuTrigger } from './menu-trigger';
import { ScMenu } from './menu';

@Component({
  selector: 'div[sc-menu-provider]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'menu-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly triggerChild = contentChild(ScMenuTrigger);
  private readonly content = contentChild(ScMenu, { descendants: true });

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);
  readonly trigger = computed(() => this.triggerChild()?.trigger);
  readonly menu = computed(() => this.content()?.menu);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    // Auto-connect trigger to menu
    effect(() => {
      const trigger = this.triggerChild()?.trigger;
      const menu = this.content()?.menu;
      if (trigger && menu) {
        signalSetFn(trigger.menu[SIGNAL], menu);
      }
    });
  }
}
