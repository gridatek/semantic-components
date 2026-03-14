import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButtonPattern } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-button-pattern-usage-demo',
  imports: [ScButtonPattern],
  template: `
    <div scButtonPattern (click)="handleClick()">Click me</div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPatternUsageDemo {
  handleClick() {
    // no-op for demo
  }
}
