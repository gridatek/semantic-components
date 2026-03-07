import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UnderlineTypographyDemo } from './underline-typography-demo';

@Component({
  selector: 'app-underline-typography-demo-container',
  imports: [DemoContainer, UnderlineTypographyDemo],
  template: `
    <app-demo-container
      title="Underline"
      demoUrl="/demos/typography/underline-typography-demo"
      [code]="code"
    >
      <app-underline-typography-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnderlineTypographyDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-underline-typography-demo',
  imports: [ScHeading],
  template: \`
    <div class="space-y-4">
      <h1 scHeading [underline]="true">H1 with Underline</h1>
      <h2 scHeading [underline]="true">H2 with Underline</h2>
      <h3 scHeading [underline]="true">H3 with Underline</h3>
      <h4 scHeading [underline]="true">H4 with Underline</h4>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnderlineTypographyDemo {}`;
}
