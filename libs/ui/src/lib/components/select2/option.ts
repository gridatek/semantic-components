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

@Component({
  selector: 'sc-option',
  template: `
    <ng-content />
  `,
  host: {
    '[attr.id]': 'id()',
    '[class]': 'class()',
    '[attr.role]': '"option"',
    '(click)': 'select()',
  },
})
export class ScOptionComponent implements Highlightable {
  element = inject(ElementRef);

  readonly id = signal<string>(inject(_IdGenerator).getId('sc-option-'));

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'block px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150',
      this.highlighted() === true && 'bg-blue-100 text-blue-900',
      this._disabled() === true && 'pointer-events-none opacity-50',
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
