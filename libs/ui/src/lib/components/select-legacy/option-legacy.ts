import { Highlightable, _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'sc-option-legacy',
  imports: [SiCheckIcon],
  template: `
    <ng-content />

    @if (selected()) {
      <span class="absolute right-2 flex size-3.5 items-center justify-center">
        <svg class="size-4" si-check-icon></svg>
      </span>
    }
  `,
  host: {
    '[attr.id]': 'id()',
    '[class]': 'class()',
    '[attr.role]': '"option"',
    '(click)': 'select()',
  },
})
export class ScOptionLegacy implements Highlightable {
  element = inject(ElementRef);

  readonly id = signal<string>(inject(_IdGenerator).getId('sc-option-legacy-'));

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.highlighted() && 'bg-accent text-accent-foreground',
      this.selected() && 'bg-accent text-accent-foreground',
      this._disabled() && 'pointer-events-none opacity-50',
      this.classInput(),
    ),
  );

  readonly value = input<any>();

  highlighted = signal(false);

  disabled = false;

  readonly disabledInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  protected readonly _disabled = computed(() => this.disabledInput() || this.disabled);

  selected = signal(false);

  setActiveStyles(): void {
    this.highlighted.set(true);
  }

  setInactiveStyles(): void {
    this.highlighted.set(false);
  }

  select() {
    if (!this._disabled()) {
      // Selection will be handled by parent component
    }
  }

  getLabel(): string {
    return this.element.nativeElement.textContent || '';
  }
}
