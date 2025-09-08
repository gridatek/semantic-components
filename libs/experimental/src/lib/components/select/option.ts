import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'lib-option',
  imports: [],
  template: `
    <div
      class="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
      [class.bg-blue-100]="active"
      [class.font-medium]="active"
      [attr.aria-selected]="active"
      role="option"
    >
      <ng-content />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScOption {
  elementRef = inject(ElementRef);

  readonly value = input<any>();
  readonly label = input.required<string>();
  active = false;

  setActiveStyles(): void {
    this.active = true;
  }

  setInactiveStyles(): void {
    this.active = false;
  }

  getLabel(): string {
    return this.label() ?? '';
  }
}
