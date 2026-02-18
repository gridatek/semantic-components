import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomSeparatorBreadcrumbDemo } from './custom-separator-breadcrumb-demo';

@Component({
  selector: 'app-custom-separator-breadcrumb-demo-container',
  imports: [DemoContainer, CustomSeparatorBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Custom Separator"
      demoUrl="/demos/breadcrumb/custom-separator-breadcrumb-demo"
      [code]="code"
    >
      <app-custom-separator-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSeparatorBreadcrumbDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-custom-separator-breadcrumb-demo',
  imports: [
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
  ],
  template: \`
    <nav scBreadcrumb>
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink href="#">Home</a>
        </li>
        <li scBreadcrumbSeparator>/</li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink href="#">Components</a>
        </li>
        <li scBreadcrumbSeparator>/</li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSeparatorBreadcrumbDemo {}`;
}
