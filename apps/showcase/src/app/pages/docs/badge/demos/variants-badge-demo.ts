import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScBadge } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-badge-demo',
  imports: [ScBadge],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <div scBadge>Default</div>
      <div scBadge variant="secondary">Secondary</div>
      <div scBadge variant="destructive">Destructive</div>
      <div scBadge variant="outline">Outline</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsBadgeDemo {}
