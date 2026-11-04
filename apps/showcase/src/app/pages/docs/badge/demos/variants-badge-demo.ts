import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-badge-demo',
  imports: [ScBadge],
  template: `
    <div class="flex flex-wrap justify-center gap-2">
      <span scBadge>Default</span>
      <span scBadge variant="secondary">Secondary</span>
      <span scBadge variant="destructive">Destructive</span>
      <span scBadge variant="outline">Outline</span>
      <span scBadge variant="ghost">Ghost</span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsBadgeDemo {}
