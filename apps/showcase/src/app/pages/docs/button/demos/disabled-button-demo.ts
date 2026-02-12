import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-button-demo',
  imports: [ScButton],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button sc-button disabled>Default</button>
      <button sc-button variant="secondary" disabled>Secondary</button>
      <button sc-button variant="destructive" disabled>Destructive</button>
      <button sc-button variant="outline" disabled>Outline</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledButtonDemo {}
