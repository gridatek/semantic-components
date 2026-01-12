import { ChangeDetectionStrategy, Component, ViewEncapsulation, viewChild } from '@angular/core';

@Component({
  selector: 'app-aria-menu-demo',
  imports: [],
  template: ``,
  styles: ``,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaMenuDemo {}
