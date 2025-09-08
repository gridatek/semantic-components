import { Highlightable } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'sc-option',
  template: `
    <ng-content></ng-content>
  `,
  standalone: true,
  host: {
    '[class]': '"px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150"',
    '[attr.role]': '"option"',
    '[attr.id]': 'id',
    '(click)': 'select()',
  },
})
export class ScOptionComponent implements Highlightable {
  @Input() value: any;
  @Input() id: string = `option-${Math.random().toString(36).substr(2, 9)}`;

  @HostBinding('class.bg-blue-100')
  @HostBinding('class.text-blue-900')
  highlighted = false;

  @HostBinding('class.pointer-events-none')
  @HostBinding('class.opacity-50')
  @Input()
  disabled = false;

  selected = false;

  constructor(public element: ElementRef) {}

  setActiveStyles(): void {
    this.highlighted = true;
  }

  setInactiveStyles(): void {
    this.highlighted = false;
  }

  select() {
    if (!this.disabled) {
      // Selection will be handled by parent component
    }
  }

  getLabel(): string {
    return this.element.nativeElement.textContent || '';
  }
}
