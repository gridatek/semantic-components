import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-link-demo',
  imports: [ScLink],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a sc-link disabled href="#">Disabled Default</a>
      <a sc-link variant="secondary" disabled href="#">Disabled Secondary</a>
      <a sc-link variant="outline" disabled href="#">Disabled Outline</a>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkDemo {}
