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
    <app-demo-container title="Variants" [code]="code">
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
      <div sc-badge>Default</div>
      <div sc-badge variant="secondary">Secondary</div>
      <div sc-badge variant="destructive">Destructive</div>
      <div sc-badge variant="outline">Outline</div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsBadgeDemo {}`;
}
