import { ToolbarWidget } from '@angular/aria/toolbar';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { toggleVariants } from '../toggle/toggle';
import { ScToolbar } from './toolbar';
import { ScToolbarToggleGroup } from './toolbar-toggle-group';

@Component({
  selector: 'button[scToolbarToggle]',
  hostDirectives: [
    {
      directive: ToolbarWidget,
      inputs: ['disabled'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    type: 'button',
    '[attr.aria-pressed]': 'selected()',
    '[attr.data-state]': 'selected() ? "on" : "off"',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToolbarToggle {
  private readonly toolbar = inject(ScToolbar);
  private readonly group = inject(ScToolbarToggleGroup, { optional: true });
  private readonly widget = inject(ToolbarWidget);

  readonly value = input.required<string>();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly selected = computed(() =>
    this.toolbar.values().includes(this.value()),
  );

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      'data-[state=on]:bg-muted',
      this.classInput(),
    ),
  );

  constructor() {
    const group = this.group;
    if (group) {
      group.register(this.value);
      inject(DestroyRef).onDestroy(() => group.unregister(this.value));
    }
  }

  protected toggle(): void {
    if (this.widget._pattern.disabled()) {
      return;
    }

    const value = this.value();
    // In a single-select group, pressing a toggle releases its siblings.
    const exclusive =
      this.group && !this.group.multi() ? this.group.values() : [];

    this.toolbar.values.update((values) =>
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values.filter((v) => !exclusive.includes(v)), value],
    );
  }
}
