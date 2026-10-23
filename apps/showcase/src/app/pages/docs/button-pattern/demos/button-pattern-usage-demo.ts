import { Component, ViewEncapsulation } from '@angular/core';
import { ScButtonPattern } from '@semantic-components/ui';

@Component({
  selector: 'app-button-pattern-usage-demo',
  imports: [ScButtonPattern],
  template: ` <div scButtonPattern (click)="handleClick()">Click me</div> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonPatternUsageDemo {
  handleClick() {
    // no-op for demo
  }
}
