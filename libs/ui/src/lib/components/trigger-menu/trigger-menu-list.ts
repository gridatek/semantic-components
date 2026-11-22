import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTriggerMenu } from './trigger-menu';

/** The suggestions: a listbox the editor points at (focus stays in the editor). Name it. */
@Directive({
  selector: 'div[scTriggerMenuList]',
  host: {
    'data-slot': 'trigger-menu-list',
    role: 'listbox',
    '[attr.id]': 'menu.listId',
    '[attr.aria-busy]': 'menu.loading() || null',
    '[attr.data-empty]': 'menu.items().length ? null : ""',
    '[class]': 'class()',
  },
})
export class ScTriggerMenuList {
  private readonly styles = injectStyle().combobox;
  private readonly menu = inject(ScTriggerMenu);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.list, this.classInput()),
  );
}
