import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'sc-option2',
  template: `
    <ng-template><ng-content></ng-content></ng-template>
  `,
  standalone: true,
})
export class ScOptionComponent implements AfterViewInit {
  @Input() value: any;
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;

  content: string = '';

  ngAfterViewInit() {
    // Extract text content for display
    this.content = this.template.elementRef?.nativeElement?.textContent?.trim() || '';
  }
}
