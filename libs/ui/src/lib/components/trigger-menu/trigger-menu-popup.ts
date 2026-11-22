import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTriggerMenu } from './trigger-menu';

/**
 * The popup at the trigger: the list, its empty text, a status. The style's
 * combobox popup; focus never comes into it.
 */
@Component({
  selector: 'div[scTriggerMenuPopup]',
  template: '<ng-content />',
  host: {
    'data-slot': 'trigger-menu-popup',
    '[attr.data-side]': 'menu.side()',
    '[attr.data-empty]': 'menu.items().length ? null : ""',
    '[animate.enter]': 'styles.popupEnter',
    '[animate.leave]': 'styles.popupLeave',
    '[class]': 'class()',
    '(pointerdown)': '$event.preventDefault()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTriggerMenuPopup {
  private readonly styles = injectStyle().combobox;
  private readonly menu = inject(ScTriggerMenu);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      this.styles.popup,
      'flex w-64 max-w-[calc(100vw-1rem)] flex-col',
      // Nothing found and nothing to say: not shown.
      !this.menu.visible() && 'hidden',
      this.classInput(),
    ),
  );
}
