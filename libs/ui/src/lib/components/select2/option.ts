import { AfterContentInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'sc-option2',
  template: `
    <ng-content></ng-content>
  `,
  standalone: true,
})
export class ScOptionComponent implements AfterContentInit {
  @Input() value: any;
  content: string = '';

  constructor(private elementRef: ElementRef) {}

  ngAfterContentInit() {
    // Extract text content after content projection
    this.content = this.elementRef.nativeElement.textContent?.trim() || '';
  }
}
