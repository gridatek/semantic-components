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
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCommandItem {
  class = input<string>('');

  classes = computed(() =>
    cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
