import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-link-demo',
  imports: [ScLink],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <a sc-link href="#">Default</a>
      <a sc-link variant="secondary" href="#">Secondary</a>
      <a sc-link variant="destructive" href="#">Destructive</a>
      <a sc-link variant="outline" href="#">Outline</a>
      <a sc-link variant="ghost" href="#">Ghost</a>
      <a sc-link variant="link" href="#">Link</a>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsLinkDemo {}
