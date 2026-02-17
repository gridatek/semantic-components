import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { toggleVariants, type ScToggleVariants } from '../toggle/toggle';
import { ScToggleGroup } from './toggle-group';

@Directive({
  selector: 'button[scToggleGroupItem]',
  host: {
    'data-slot': 'toggle-group-item',
    type: 'button',
    '[attr.data-variant]': 'group.variant() || variant()',
    '[attr.data-size]': 'group.size() || size()',
    '[attr.data-spacing]': 'group.spacing()',
    '[attr.aria-pressed]': 'isSelected()',
    '[attr.data-state]': 'isSelected() ? "on" : "off"',
    '[disabled]': 'isDisabled()',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScToggleGroupItem {
  protected readonly group = inject(ScToggleGroup);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');

  protected readonly isSelected = computed(() =>
    this.group.isSelected(this.value()),
  );

  protected readonly isDisabled = computed(
    () => this.disabled() || this.group.disabled(),
  );

  protected readonly class = computed(() =>
    cn(
      'group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
      toggleVariants({
        variant: this.group.variant() || this.variant(),
        size: this.group.size() || this.size(),
      }),
      this.classInput(),
    ),
  );

  protected onClick(): void {
    if (!this.isDisabled()) {
      this.group.toggle(this.value());
    }
  }
}
