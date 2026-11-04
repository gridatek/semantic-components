import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EllipsisMenuBreadcrumbDemo } from './ellipsis-menu-breadcrumb-demo';

@Component({
  selector: 'app-ellipsis-menu-breadcrumb-demo-container',
  imports: [DemoContainer, EllipsisMenuBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Collapsed with Menu"
      demoUrl="/demos/breadcrumb/ellipsis-menu-breadcrumb-demo"
      [code]="code"
    >
      <app-ellipsis-menu-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EllipsisMenuBreadcrumbDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbEllipsis,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

/** The steps left out, in a menu: the ellipsis inside a menu trigger (an icon button, named by its sr-only text). */
@Component({
  selector: 'app-ellipsis-menu-breadcrumb-demo',
  imports: [
    RouterLink,
    ScBreadcrumb,
    ScBreadcrumbEllipsis,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiChevronRightIcon,
    SiEllipsisIcon,
  ],
  template: \`
    <nav scBreadcrumb aria-label="Docs path">
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/">Home</a>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <!-- The steps left out, in a menu behind the ellipsis. -->
          <div scMenuProvider>
            <button scButton scMenuTrigger variant="ghost" size="icon-sm">
              <span scBreadcrumbEllipsis><svg siEllipsisIcon></svg></span>
              <span class="sr-only">More pages</span>
            </button>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Documentation">Documentation</div>
                  <div scMenuItem value="Themes">Themes</div>
                  <div scMenuItem value="GitHub">GitHub</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/docs/components">Components</a>
        </li>
        <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EllipsisMenuBreadcrumbDemo {}`;
}
