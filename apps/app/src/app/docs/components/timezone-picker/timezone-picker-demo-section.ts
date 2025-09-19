import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimezonePickerDemo } from './timezone-picker-demo';

@Component({
  selector: 'app-timezone-picker-demo-section',
  imports: [PreviewCodeTabs, TimezonePickerDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-timezone-picker-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimezonePickerDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

  import { ScBadge } from '@semantic-components/ui';

  @Component({
    selector: 'app-badge-demo',
    imports: [ScBadge],
    template: \`
      <div class="flex flex-wrap gap-2 content-center">
        <div sc-badge variant="primary">Primary</div>
        <div sc-badge variant="secondary">Secondary</div>
        <div sc-badge variant="destructive">Destructive</div>
        <div sc-badge variant="outline">Outline</div>
      </div>
    \`,
    styles: \`\`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class BadgeDemo {}`;
}
