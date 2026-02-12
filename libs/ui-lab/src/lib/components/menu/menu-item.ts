import { MenuItem } from '@angular/aria/menu';
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-menu-item]',
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value', 'submenu'],
    },
  ],
  host: {
    'data-slot': 'menu-item',
    '[class]': 'class()',
  },
})
export class ScMenuItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.inset() && 'pl-8',
      this.classInput(),
    ),
  );
}
