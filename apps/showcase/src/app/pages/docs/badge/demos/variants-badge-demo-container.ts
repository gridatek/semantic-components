import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsBadgeDemo } from './variants-badge-demo';

@Component({
  selector: 'app-variants-badge-demo-container',
  imports: [DemoContainer, VariantsBadgeDemo],
  template: `
    <app-demo-container
      title="Variants"
      demoUrl="/demos/badge/variants-badge-demo"
      [code]="code"
    >
      <app-variants-badge-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsBadgeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScBadge } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-badge-demo',
  imports: [ScBadge],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <div scBadge>Default</div>
      <div scBadge variant="secondary">Secondary</div>
      <div scBadge variant="destructive">Destructive</div>
      <div scBadge variant="outline">Outline</div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsBadgeDemo {}`;
}
