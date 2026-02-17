import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-button-demo',
  imports: [ScButton],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button scButton disabled>Default</button>
      <button scButton variant="secondary" disabled>Secondary</button>
      <button scButton variant="destructive" disabled>Destructive</button>
      <button scButton variant="outline" disabled>Outline</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledButtonDemo {}
