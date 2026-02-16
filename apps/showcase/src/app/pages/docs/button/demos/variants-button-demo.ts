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
      <button scButton>Default</button>
      <button scButton variant="secondary">Secondary</button>
      <button scButton variant="destructive">Destructive</button>
      <button scButton variant="outline">Outline</button>
      <button scButton variant="ghost">Ghost</button>
      <button scButton variant="link">Link</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsButtonDemo {}
