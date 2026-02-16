import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-button-offset-timezone-demo',
  imports: [ScTimezoneButton],
  template: `
    <button scTimezoneButton variant="outline" [showOffset]="true"></button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonOffsetTimezoneDemo {}
