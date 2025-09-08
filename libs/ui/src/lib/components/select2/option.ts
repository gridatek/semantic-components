import { Highlightable } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  computed,
  input,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'sc-option2',
  template: `
    <ng-content></ng-content>
  `,
  standalone: true,
  host: {
    '[class]': 'class()',
    role: 'option',
    tabindex: '0',
  },
})
export class ScOptionComponent implements AfterContentInit, Highlightable {
  @Input() value: any;
  content: string = '';
  active = signal(false);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'block px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-gray-100 focus:bg-blue-100 focus:text-blue-700 focus:outline-none',
      this.active() && 'bg-blue-50 text-blue-600 font-medium',
      this.classInput(),
    ),
  );

  constructor(private elementRef: ElementRef) {}

  ngAfterContentInit() {
    // Extract text content after content projection
    this.content = this.elementRef.nativeElement.textContent?.trim() || '';
  }

  // Highlightable interface implementation
  setActiveStyles(): void {
    this.active.set(true);
  }

  setInactiveStyles(): void {
    this.active.set(false);
  }

  getLabel(): string {
    return this.content;
  }
}
