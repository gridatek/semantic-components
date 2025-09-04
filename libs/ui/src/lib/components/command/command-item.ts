import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-command-item',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-disabled]': 'disabled()',
    '[attr.data-selected]': 'selected()',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onClick()',
    '(mouseenter)': 'onMouseEnter()',
    '[attr.role]': '"option"',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    'data-slot': 'command-item',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandItem {
  class = input<string>('');

  classes = computed(() =>
    cn(
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      this.class(),
    ),
  );

  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  readonly selected = signal(false);

  readonly value = input<string>('');

  readonly select = output<string>();
  readonly mouseEnter = output<void>();

  onClick() {
    if (!this.disabled()) {
      this.select.emit(this.value());
    }
  }

  onMouseEnter() {
    if (!this.disabled()) {
      this.mouseEnter.emit();
    }
  }
}
