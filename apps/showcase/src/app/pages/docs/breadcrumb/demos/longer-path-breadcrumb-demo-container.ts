import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LongerPathBreadcrumbDemo } from './longer-path-breadcrumb-demo';

@Component({
  selector: 'app-longer-path-breadcrumb-demo-container',
  imports: [DemoContainer, LongerPathBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Longer Path"
      demoUrl="/demos/breadcrumb/longer-path-breadcrumb-demo"
      [code]="code"
    >
      <app-longer-path-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongerPathBreadcrumbDemoContainer {
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
  selector: 'app-longer-path-breadcrumb-demo',
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
        <li scBreadcrumbSeparator></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink href="#">Dashboard</a>
        </li>
        <li scBreadcrumbSeparator></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink href="#">Settings</a>
        </li>
        <li scBreadcrumbSeparator></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink href="#">Profile</a>
        </li>
        <li scBreadcrumbSeparator></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>Edit</span>
        </li>
      </ol>
    </nav>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongerPathBreadcrumbDemo {}`;
}
