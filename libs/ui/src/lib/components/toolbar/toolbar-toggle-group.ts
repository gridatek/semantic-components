import { ToolbarWidgetGroup } from '@angular/aria/toolbar';
import {
  Component,
  Signal,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scToolbarToggleGroup]',
  hostDirectives: [
    {
      directive: ToolbarWidgetGroup,
      inputs: ['disabled'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToolbarToggleGroup {
  /** Whether more than one toggle in the group can be pressed at once. */
  readonly multi = input(false, { transform: booleanAttribute });

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-0.5', this.classInput()),
  );

  private readonly toggleValues = signal<Signal<string>[]>([]);

  /** Values of all toggles in this group. */
  readonly values = computed(() => this.toggleValues().map((value) => value()));

  register(value: Signal<string>): void {
    this.toggleValues.update((values) => [...values, value]);
  }

  unregister(value: Signal<string>): void {
    this.toggleValues.update((values) => values.filter((v) => v !== value));
  }
}
