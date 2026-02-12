import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import {
  ScToggleGroup,
  ToggleGroupSize,
  ToggleGroupVariant,
} from './toggle-group';

const variantClasses: Record<ToggleGroupVariant, string> = {
  default: 'bg-transparent',
  outline:
    'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
};

const sizeClasses: Record<ToggleGroupSize, string> = {
  default: 'h-10 px-3',
  sm: 'h-9 px-2.5',
  lg: 'h-11 px-5',
};

@Directive({
  selector: 'button[sc-toggle-group-item]',
  host: {
    'data-slot': 'toggle-group-item',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'isSelected()',
    '[attr.data-state]': 'isSelected() ? "on" : "off"',
    '[disabled]': 'isDisabled()',
    '(click)': 'onClick()',
  },
})
export class ScToggleGroupItem {
  private readonly group = inject(ScToggleGroup);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);

  protected readonly isSelected = computed(() =>
    this.group.isSelected(this.value()),
  );
  protected readonly isDisabled = computed(
    () => this.disabled() || this.group.disabled(),
  );

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      this.isSelected() && 'bg-accent text-accent-foreground',
      variantClasses[this.group.variant()],
      sizeClasses[this.group.size()],
      this.classInput(),
    ),
  );

  protected onClick(): void {
    if (!this.isDisabled()) {
      this.group.toggle(this.value());
    }
  }
}
