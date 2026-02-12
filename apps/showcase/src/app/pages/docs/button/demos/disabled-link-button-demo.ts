import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-link-button-demo',
  imports: [ScLink],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a sc-link disabled>Default</a>
      <a sc-link variant="secondary" disabled>Secondary</a>
      <a sc-link variant="destructive" disabled>Destructive</a>
      <a sc-link variant="outline" disabled>Outline</a>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkButtonDemo {}
