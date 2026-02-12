import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-button-demo',
  imports: [ScButton],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button sc-button>Default</button>
      <button sc-button variant="secondary">Secondary</button>
      <button sc-button variant="destructive">Destructive</button>
      <button sc-button variant="outline">Outline</button>
      <button sc-button variant="ghost">Ghost</button>
      <button sc-button variant="link">Link</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsButtonDemo {}
