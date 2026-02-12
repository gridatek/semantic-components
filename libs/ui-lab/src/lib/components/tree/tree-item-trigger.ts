import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TREE_ITEM } from './tree-item';

@Component({
  selector: 'button[sc-tree-item-trigger], a[sc-tree-item-trigger]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'tree-item-trigger',
    type: 'button',
    '[class]': 'class()',
    '[style.padding-left]': 'paddingLeft()',
    '(click)': 'onClick($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTreeItemTrigger {
  readonly item = inject(SC_TREE_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm w-full',
      'cursor-pointer select-none outline-none',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:bg-accent focus-visible:text-accent-foreground',
      'aria-[selected=true]:bg-accent aria-[selected=true]:text-accent-foreground',
      this.classInput(),
    ),
  );

  protected readonly paddingLeft = computed(() => {
    const level = this.item.level();
    return `${level * 12 + 8}px`;
  });

  protected onClick(event: Event): void {
    event.preventDefault();
  }
}
