import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DropdownBreadcrumbDemo } from './dropdown-breadcrumb-demo';

@Component({
  selector: 'app-dropdown-breadcrumb-demo-container',
  imports: [DemoContainer, DropdownBreadcrumbDemo],
  template: `
    <app-demo-container
      title="Dropdown"
      demoUrl="/demos/breadcrumb/dropdown-breadcrumb-demo"
      [code]="code"
    >
      <app-dropdown-breadcrumb-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DropdownBreadcrumbDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScBreadcrumbPage,
  ScBreadcrumbSeparator,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon, SiDotIcon } from '@semantic-icons/lucide-icons';

/** A crumb that opens a menu: the pages beside it, a step away. */
@Component({
  selector: 'app-dropdown-breadcrumb-demo',
  imports: [
    RouterLink,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScBreadcrumbPage,
    ScBreadcrumbSeparator,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiChevronDownIcon,
    SiDotIcon,
  ],
  template: \`
    <nav scBreadcrumb aria-label="Docs location">
      <ol scBreadcrumbList>
        <li scBreadcrumbItem>
          <a scBreadcrumbLink routerLink="/">Home</a>
        </li>
        <li scBreadcrumbSeparator><svg siDotIcon></svg></li>
        <li scBreadcrumbItem>
          <div scMenuProvider>
            <button
              scMenuTrigger
              class="hover:text-foreground flex items-center gap-1 transition-colors"
            >
              Components
              <svg siChevronDownIcon class="size-3.5"></svg>
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
        <li scBreadcrumbSeparator><svg siDotIcon></svg></li>
        <li scBreadcrumbItem>
          <span scBreadcrumbPage>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DropdownBreadcrumbDemo {}`;
}
