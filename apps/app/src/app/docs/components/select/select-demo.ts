import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-select-demo',
  imports: [],
  template: `
    <!-- Add your select demo code here -->
  `,
  host: {
    class: 'block w-[180px]',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo {}
